require './models/mpd_connection'

class Album < Struct.new(:title, :artist, :genre, :year)

  def initialize(album)
    first_song = MPDConnection.mpd.where(album: album).first
    self.title = first_song.album
    self.artist = first_song.artist
    self.genre = first_song.genre
    self.year  = first_song.date
  end

  def <=>(album)
    year <=> album.year
  end

  def self.all
    MPDConnection.mpd.albums.sort.map { |album| self.new(album) }
  end

  def self.by_artist(artist)
    MPDConnection.mpd.albums(artist).map { |album| self.new(album) }
  end
end
