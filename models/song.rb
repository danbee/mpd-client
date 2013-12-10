require './models/mpd_connection'

class Song < Struct.new(:id, :track, :artist, :album, :title, :length, :pos, :playing)

  def initialize(song, pos: nil, playing: false)
    self.id = song.id
    self.track = song.track
    self.artist = song.artist
    self.album = song.album
    self.title  = song.title
    self.length = song.time
    self.pos = pos
    self.playing = playing
  end

  def <=>(song)
    title <=> song.title
  end

  def self.queue
    current_song = MPDConnection.mpd.status[:songid]
    MPDConnection.mpd.queue.map { |song| self.new(song, playing: (song.id == current_song), pos: song.pos) }
  end

  def self.all
    MPDConnection.mpd.songs.map { |album| self.new(album) }
  end

  def self.by_artist(artist)
    MPDConnection.mpd.where(artist: artist).map { |song| self.new(song) }
  end

  def self.by_album(artist, album)
    MPDConnection.mpd.where(artist: artist, album: album).map { |song| self.new(song) }
  end
end
