module MPDClient
  class Album

    include ClassToProc
    include Jsonable

    extend Forwardable

    delegate %i(artist genre) => :@first_song

    def initialize(album)
      @first_song = MPDClient::Song.by(album: album).first
    end

    def title
      @first_song.album
    end

    def year
      @first_song.date
    end

    def <=>(other)
      year <=> other.year
    end

    def to_h
      {
        title: title,
        artist: artist,
        genre: genre,
        year: year
      }
    end

    class << self
      def all
        MPDClient.conn.albums.sort.map(&self)
      end

      def by_artist(artist)
        MPDClient.conn.albums(artist).map(&self)
      end
    end

  end
end
