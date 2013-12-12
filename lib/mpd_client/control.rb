module MPDClient
  class Control

    class << self
      def controls
        %i(play stop next previous pause)
      end

      def play(pos)
        MPDClient.conn.play(pos)
      end

      def stop
        MPDClient.conn.stop
      end

      def next
        MPDClient.conn.next
      end

      def previous
        MPDClient.conn.previous
      end

      def pause
        MPDClient.conn.pause = !MPDClient.conn.paused?
      end

      def volume(value)
        MPDClient.conn.volume = value
      end
    end

  end
end
