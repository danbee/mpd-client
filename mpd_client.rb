require 'bundler'
ENV['RACK_ENV'] ||= 'development'
Bundler.require(:default, ENV['RACK_ENV'])

require 'json'
require 'cgi'

require './models/control'
require './models/album'
require './models/artist'
require './models/song'

class MPDClient < Sinatra::Base
  register Sinatra::Namespace

  namespace '/api' do

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
      JSON Song.queue.map(&:to_h)
    end

  end

end
