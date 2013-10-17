require './models/mpd_connection'

class Control
  class << self
    def play
      MPDConnection.mpd.play
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
      MPDConnection.mpd.pause(!MPDConnection.mpd.paused?)
    end
  end
end
