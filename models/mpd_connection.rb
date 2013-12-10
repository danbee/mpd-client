class MPDConnection < SimpleDelegator

  attr_accessor :connections

  def initialize(host: 'localhost', port: 6600)
    @mpd = MPD.new(host, port, { callbacks: true })
    @mpd.connect unless @mpd.connected?

    @connections = []
    super(@mpd)
  end

  def queue
    current_song = status[:songid]
    super.map { |song| Song.new(song, playing: (song.id == current_song), pos: song.pos).to_h }
  end

  def pause
    self.pause = !self.paused?
    true
  end

  def volume(vol)
    if vol.between?(0, 100)
      self.volume = vol
      true
    end
  end

  def command(command)
    if controls.include?(command)
      send(command)
    end
  end

  private

  def controls
    [:play, :stop, :next, :previous, :pause]
  end
end
