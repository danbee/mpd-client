require './models/mpd_connection'

class Song < Struct.new(:artist, :album, :title)

  def initialize(song)
    @song = song
    self.artist = song.artist
    self.album = song.album
    self.title  = song.title
  end

  def self.queue
    MPDConnection.mpd.queue.map { |song| self.new(song) }
  end
end
