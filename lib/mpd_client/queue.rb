module MPDClient
  class Queue

    include Enumerable
    include Jsonable

    attr :songs

    def initialize
      @songs = fetch_songs
    end

    def each(&block)
      songs.each(&block)
    end

    def to_h
      map(&:to_h)
    end

    private

    def fetch_songs
      MPDClient.conn.queue.map(&Song)
    end

  end
end
