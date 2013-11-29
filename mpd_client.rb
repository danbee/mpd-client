require 'bundler'
ENV['RACK_ENV'] ||= 'development'
Bundler.require(:default, ENV['RACK_ENV'])

require 'sinatra/asset_pipeline'

require 'json'
require 'cgi'

require './models/mpd_connection'
require './models/control'
require './models/album'
require './models/artist'
require './models/song'

class MPDClient < Sinatra::Base

  set :assets_precompile, %w(app.js app.css *.png *.jpg *.svg *.eot *.ttf *.woff)
  set :assets_prefix, 'assets'
  register Sinatra::AssetPipeline

  register Sinatra::Namespace

  get '/' do
    erb :index
  end

  namespace '/api' do

    get '/status' do
      JSON MPDConnection.status
    end

    get '/albums' do
      JSON Album.all.map(&:to_h)
    end

    get '/artists/:artist' do
      JSON Album.by_artist(CGI.unescape(params[:artist])).sort.map(&:to_h)
    end

    #get '/albums/:album' do
      #JSON get_songs_by_album(CGI.unescape(params[:album]))
    #end

    #get '/artists/:artist/:album' do
      #JSON get_songs_by_album(CGI.unescape(params[:album]))
    #end

    get '/artists' do
      JSON Artist.all.map(&:to_h)
    end

    get '/queue' do
      JSON({ data: Song.queue.map(&:to_h) })
    end

    put '/control/:action' do
      if Control.controls.include?(params[:action].to_sym)
        Control.send(params[:action])
        JSON MPDConnection.status
      else
        not_found
      end
    end

    put '/control/volume/:value' do
      Control.volume(params[:value])
    end

  end

end
