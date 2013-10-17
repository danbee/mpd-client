require './models/mpd_connection'

class Song < Struct.new(:artist, :album, :title, :current)

  def initialize(song, current: false)
    @song = song
    self.artist = song.artist
    self.album = song.album
    self.title  = song.title
    self.current = current
  end

  def self.queue
    current_song = MPDConnection.mpd.status[:songid]
    MPDConnection.mpd.queue.map { |song| self.new(song, current: (song.id == current_song)) }
  end
end
