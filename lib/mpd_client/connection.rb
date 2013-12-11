module MPDClient
  class Connection < MPD

    attr_accessor :connected_users

    def initialize(host, port, opts = {})
      @connected_users = Set.new
      super host, port, opts.merge(callbacks: true)
    end

    def each_conn(&block)
      connected_users.each(&block)
    end

  end
end
