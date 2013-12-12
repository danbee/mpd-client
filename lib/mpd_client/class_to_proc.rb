module MPDClient
  module ClassToProc

    def self.included(receiver)
      receiver.define_singleton_method :to_proc do
        proc { |*args| new(*args) }
      end
    end

  end
end
