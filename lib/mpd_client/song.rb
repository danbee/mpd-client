module MPDClient
  class Song

    include ClassToProc
    include Comparable
    extend Forwardable

    delegate %i(id track artist album title genre date time pos) => :@song

    def initialize(song, pos: nil)
      @song = song
    end

    def playing?
      self == self.class.current_song
    end

    def length
      time
    end

    def <=>(other)
      [artist, album, title]  == [other.artist, other.album, other.title]
    end

    def to_h
      {
        id: id,
        track: track,
        artist: artist,
        album: album,
        title: title,
        length: length,
        pos: pos,
        playing: playing?
      }
    end

    class << self
      def by(**params)
        params.delete_if {|_, v| v.nil? }
        MPDClient.conn.where(params).map(&self)
      end

      def all
        MPDClient.conn.songs.map(&self)
      end

      def queue
        MPDClient.conn.queue.map(&self)
      end

      def current_song
        new(MPDClient.conn.current_song)
      end
    end

  end
end
