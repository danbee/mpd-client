require 'bundler'
ENV['RACK_ENV'] ||= 'development'
Bundler.require(:default, ENV['RACK_ENV'])

require 'sinatra/asset_pipeline'

require 'sass'
require 'json'
require 'cgi'

require './models/mpd_connection'
require './models/control'
require './models/album'
require './models/artist'
require './models/song'

class MPDClient < Sinatra::Base

  set server: 'thin', connections: []

  set :assets_precompile, %w(app.js app.css *.png *.jpg *.svg *.eot *.ttf *.woff)
  set :assets_prefix, 'assets'
  register Sinatra::AssetPipeline

  register Sinatra::Namespace

  get '/' do
    erb :index
  end

  def self.send_status
    response = JSON({ type: 'status', data: MPDConnection.status })
    settings.connections.each { |out| out << "data: #{response}\n\n" }
  end

  def self.send_queue
    response = JSON({ type: 'queue', data: Song.queue.map(&:to_h) })
    settings.connections.each { |out| out << "data: #{response}\n\n" }
  end

  def self.send_time(elapsed, total)
    response = JSON({ type: 'time', data: { elapsed: elapsed, total: total } })
    settings.connections.each { |out| out << "data: #{response}\n\n" }
  end

  MPDConnection.mpd.on(:song) { |song| send_status }
  MPDConnection.mpd.on(:state) { |state| send_status }
  MPDConnection.mpd.on(:playlist) { |playlist| send_queue }
  MPDConnection.mpd.on(:time) { |elapsed, total| send_time(elapsed, total) }

  namespace '/api' do

    get '/status' do
      JSON MPDConnection.status
    end

    get '/stream', provides: 'text/event-stream' do
      stream :keep_open do |out|
        settings.connections << out
        out.callback { settings.connections.delete(out) }
      end
    end

    get '/albums' do
      content_type 'application/json'
      JSON Album.all.map(&:to_h)
    end

    get '/artists/:artist' do
      content_type 'application/json'
      JSON Album.by_artist(CGI.unescape(params[:artist])).sort.map(&:to_h)
    end

    #get '/albums/:album' do
      #JSON get_songs_by_album(CGI.unescape(params[:album]))
    #end

    #get '/artists/:artist/:album' do
      #JSON get_songs_by_album(CGI.unescape(params[:album]))
    #end

    get '/artists' do
      content_type 'application/json'
      JSON Artist.all.map(&:to_h)
    end

    get '/queue' do
      content_type 'application/json'
      JSON({ data: Song.queue.map(&:to_h) })
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
      Control.volume(params[:value])
    end

  end

end
