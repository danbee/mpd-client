module MPDClient
  class Artist

    include ClassToProc

    attr :name

    def initialize(name)
      @name = name
    end

    class << self
      def all
        MPDClient.conn.artists.sort.map(&self)
      end
    end
  end
end
