ENV['RACK_ENV'] ||= 'development'

require 'bundler'

Bundler.setup
Bundler.require(:default, ENV['RACK_ENV'])

require File.expand_path('lib/mpd_client', __dir__)

run MPDClient::Webserver
