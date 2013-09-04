require './models/mpd_connection'

class Artist < Struct.new(:name)
  def self.all
    MPDConnection.mpd.artists.sort.map { |artist| self.new(artist) }
  end
end
