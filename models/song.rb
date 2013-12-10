class Song < Struct.new(:id, :artist, :album, :title, :length, :pos, :playing)

  def initialize(song, pos: nil, playing: false)
    self.id = song.id
    self.artist = song.artist
    self.album = song.album
    self.title  = song.title
    self.length = song.time
    self.pos = pos
    self.playing = playing
  end
end
