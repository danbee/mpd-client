require './models/mpd_connection'

class Artist
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def self.all
    MPDConnection.mpd.artists.sort.map { |artist| Artist.new(artist) }
  end

  def attributes
    { name: @name }
  end
end
