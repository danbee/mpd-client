require 'sinatra'
require 'json'
require 'ruby-mpd'

class MPDClient < Sinatra::Base
  before do
    @mpd = MPD.new
    @mpd.connect
  end

  get '/api/albums' do
    @mpd.albums
  end
end
