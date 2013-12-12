ENV['RACK_ENV'] = 'test'

require 'bundler'
Bundler.setup
Bundler.require(:default, ENV['RACK_ENV'])

require File.expand_path('../lib/mpd_client', __dir__)
require 'rspec'
require 'rspec/mocks'
require 'rack/test'

RSpec.configure do |config|

  config.before(:each) do
    allow_message_expectations_on_nil
    MPDClient::Connection.any_instance.stub(:connected?).and_return(true)
  end

end
