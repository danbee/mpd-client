ENV['RACK_ENV'] = 'test'

require File.expand_path('../lib/mpd_client', __dir__)
require 'rspec'
require 'rspec/mocks'
require 'rack/test'

RSpec.configure do |config|
  config.include Rack::Test::Methods

  config.before(:each) do
    allow_message_expectations_on_nil
    MPDClient::Connection.any_instance.stub(:connected?).and_return(true)
  end

end
