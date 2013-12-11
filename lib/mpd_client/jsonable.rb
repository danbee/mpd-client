module MPDClient
  module Jsonable

    def self.included(receiver)
      receiver.send(:include, InstanceMethods)
    end

    module InstanceMethods
      def to_json(*args)
        to_h.to_json(*args)
      end
    end

  end
end
