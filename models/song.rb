require './models/mpd_connection'

class Song < Struct.new(:id, :artist, :album, :title, :playing)

  def initialize(song, playing: false)
    @song = song
    self.id = song.songid
    self.artist = song.artist
    self.album = song.album
    self.title  = song.title
    self.playing = playing
  end

  def self.queue
    current_song = MPDConnection.mpd.status[:songid]
    MPDConnection.mpd.queue.map { |song| self.new(song, playing: (song.id == current_song)) }
  end
end
