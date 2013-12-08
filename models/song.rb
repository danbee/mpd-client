require './models/mpd_connection'

class Song < Struct.new(:id, :artist, :album, :title, :pos, :playing)

  def initialize(song, pos: nil, playing: false)
    self.id = song.id
    self.artist = song.artist
    self.album = song.album
    self.title  = song.title
    self.pos = pos
    self.playing = playing
  end

  def self.queue
    current_song = MPDConnection.mpd.status[:songid]
    MPDConnection.mpd.queue.map { |song| self.new(song, playing: (song.id == current_song), pos: song.pos) }
  end
end
