module MPDClient
  class Artist

    include ClassToProc

    class << self
      def all
        MPDClient.conn.artists.sort.map(&self)
      end
    end
  end
end
