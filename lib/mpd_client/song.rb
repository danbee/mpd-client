module MPDClient
  class Song

    include ClassToProc
    include Comparable
    include Jsonable

    extend Forwardable

    delegate %i(id track artist album title genre date time pos) => :@song

    def initialize(song, pos: nil)
      @song = song
    end

    def playing?
      if current = self.class.current_song
        [artist, album, title]  == [current.artist, current.album, current.title]
      end
    end

    def length
      time
    end

    def <=>(other)
      [artist, album, title] <=> [other.artist, other.album, other.title]
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

      def current_song
        if song = MPDClient.conn.current_song
          new(song)
        end
      end
    end

  end
end
