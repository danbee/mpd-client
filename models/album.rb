require './models/mpd_connection'

class Album
  attr_accessor :title, :genre, :year

  def initialize(album)
    first_song = MPDConnection.mpd.search(:album, album).first
    @title = first_song.album
    @genre = first_song.genre
    @year  = first_song.date
  end

  def <=>(album)
    year <=> album.year
  end

  def self.all
    MPDConnection.mpd.albums.sort.map { |artist| Album.new(album) }
  end

  def self.by_artist(artist)
    MPDConnection.mpd.albums(artist).map { |album| Album.new(album) }
  end

  def attributes
    { title: @title,
      genre: @genre,
      year: @year }
  end
end
