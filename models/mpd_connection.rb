class MPDConnection
  def self.mpd
    @mpd ||= MPD.new('localhost', 6600, { callbacks: true })
    @mpd.connect unless @mpd.connected?
    @mpd
  end

  def self.status
    self.mpd.status
  end
end
