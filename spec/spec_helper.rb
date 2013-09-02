ENV['RACK_ENV'] = 'test'

require File.join(File.dirname(__FILE__), '..', 'mpd_client.rb')

require 'sinatra'
require 'rack/test'

# setup test environment
set :environment, :test
set :run, false
set :raise_errors, true
set :logging, false

def app
  MPDClient
end

RSpec.configure do |config|
  config.include Rack::Test::Methods
end
