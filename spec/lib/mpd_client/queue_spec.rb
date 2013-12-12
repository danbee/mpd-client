require 'spec_helper'

describe MPDClient::Queue do

  subject { MPDClient::Queue.new }

  let(:song1) { MPD::Song.new({ title: 'Back in Black', album: 'Back in Black', genre: 'Rock', date: '1980' }) }

  let(:song2) { MPD::Song.new({ title: 'Highway to Hell', album: 'Highway to Hell', genre: 'Rock', date: '1979' }) }

  before do
    MPDClient.conn.stub(:queue).and_return([song1, song2])
  end

  its(:songs) { should have(2).items }

end
