module MPDClient
  class Artist

    include ClassToProc
    include Jsonable

    attr :name

    def initialize(name)
      @name = name
    end

    def to_h
      {
        name: name
      }
    end

    class << self
      def all
        MPDClient.conn.artists.sort.map(&self)
      end
    end
  end
end
