require 'bundler'
ENV['RACK_ENV'] ||= 'development'
Bundler.require(:default, ENV['RACK_ENV'])

require 'json'
require 'cgi'

require './models/album'

class MPDClient < Sinatra::Base
  register Sinatra::Namespace

  namespace '/api' do

    get '/albums' do
      JSON mpd.albums
    end

    get '/artists/:artist' do
      JSON get_albums_by_artist(CGI.unescape(params[:artist]))
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

  def get_albums_by_artist(artist)
    mpd.albums(artist).map { |album| album_info(album) }.sort { |a, b| a[:year] <=> b[:year] }
  end

  def get_songs_by_album(album)
    mpd.search(:album, album).map { |song| song_info(song) }
  end

  def song_info(song)
    { disc: song.disc,
      track: song.track,
      title: song.title }
  end

  def album_info(album)
    first_song = mpd.search(:album, album).first
    { title: first_song.album,
      genre: first_song.genre,
      year: first_song.date }
  end

  def mpd
    MPDConnection.mpd
  end

end
