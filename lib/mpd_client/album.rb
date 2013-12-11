module MPDClient
  class Album

    include ClassToProc
    include Enumerable
    extend Forwardable

    delegate %i(artist genre) => :@first_song

    def initialize(album)
      @songs = MPDClient::Song.by(album: album)
      @first_song = @songs.first
    end

    def each(&block)
      @songs.each(&block)
    end

    def title
      @first_song.album
    end

    def year
      @first_song.year
    end

    def to_h
      {
        title: title,
        artist: artist,
        genre: genre,
        year: year,
        songs: self.map(&:to_h)
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
