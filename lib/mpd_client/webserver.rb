require 'sinatra'
require 'sinatra/asset_pipeline'
require 'sass'
require 'cgi'
require 'active_support/core_ext/hash/slice'

module MPDClient
  class Webserver < Sinatra::Base

    set server: 'thin'

    set :root, File.expand_path('../../', __dir__)

    set :assets_precompile, %w(app.js app.css *.png *.jpg *.svg *.eot *.ttf *.woff)
    set :assets_prefix, ['assets']

    register Sinatra::AssetPipeline
    register Sinatra::Namespace

    MPDClient.connect!

    MPDClient.listen do
      on :song do
        each_conn do |conn|
          json = { type: 'status', data: status }.to_json
          conn << "data: #{json}\n\n"
        end
      end

      on :state do
        each_conn do |conn|
          json = { type: 'status', data: status }.to_json
          conn << "data: #{json}\n\n"
        end
      end

      on :playlist do
        each_conn do |conn|
          json = { type: 'queue', data: Queue.new }.to_json
          conn << "data: #{json}\n\n"
        end
      end

      on :time do |elapsed, total|
        each_conn do |conn|
          json = { type: 'time', data: [elapsed, total] }.to_json
          conn << "data: #{json}\n\n"
        end
      end
    end

    get '/' do
      erb :index
    end

    namespace '/api' do

      get '/status' do
        MPDClient.status.to_json
      end

      get '/stream', provides: 'text/event-stream' do
        stream :keep_open do |conn|
          MPDClient.connect_user(conn)
          conn.callback { MPDClient.disconnect_user(conn) }
        end
      end

      get '/albums' do
        content_type 'application/json'
        if params[:artist]
          Album.by_artist(params[:artist]).sort.to_json
        else
          Album.all.to_json
        end
      end

      get '/artists' do
        content_type 'application/json'
        Artist.all.to_json
      end

      get '/songs' do
        content_type 'application/json'
        if query = params.slice(:artist, :album) and !query.empty?
          Song.by(**query).to_json
        else
          Song.all.sort.to_json
        end
      end

      get '/queue' do
        content_type 'application/json'
        { data: Queue.new }.to_json
      end

      put '/control/play' do
        Control.play(params[:pos])
      end

      put '/control/:action' do
        if Control.controls.include?(params[:action].to_sym)
          Control.send(params[:action])
        else
          not_found
        end
      end

      put '/control/volume/:value' do
        content_type 'application/json'
        unless Control.volume(params[:value].to_i)
          status 422
        end
      end

    end

  end
end
