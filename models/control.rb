require './models/mpd_connection'

class Control
  class << self
    def controls
      [:play, :stop, :next, :previous, :pause]
    end

    def play(pos = nil)
      MPDConnection.mpd.play(pos)
    end

    def stop
      MPDConnection.mpd.stop
    end

    def next
      MPDConnection.mpd.next
    end

    def previous
      MPDConnection.mpd.previous
    end

    def pause
      MPDConnection.mpd.pause = !MPDConnection.mpd.paused?
    end

    def volume(value)
      MPDConnection.mpd.volume = value
    end
  end
end
