require 'sinatra'
require "sinatra/namespace"
require 'json'
require 'ruby-mpd'
require 'cgi'

class MPDClient < Sinatra::Base
  register Sinatra::Namespace

  namespace '/api' do

    get '/albums' do
      JSON mpd.albums
    end

    get '/artists/:artist' do
      JSON mpd.albums(CGI.unescape(params[:artist]))
    end

    get '/albums/:album' do
      JSON get_songs_by_album(CGI.unescape(params[:album]))
    end

    get '/artists/:artist/:album' do
      JSON get_songs_by_album(CGI.unescape(params[:album]))
    end

    get '/artists' do
      JSON mpd.artists
    end

  end

  private

  def get_songs_by_album(album)
    mpd.search(:album, album).map do |song|
      { tracknumber: song.track,
        title: song.title }
    end
  end

  def mpd
    @mpd ||= MPD.new
    @mpd.connect unless @mpd.connected?
    @mpd
  end

end
