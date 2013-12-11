require 'spec_helper'

describe MPDClient::Song do

  subject { MPDClient::Song }

  let(:song1) { MPD::Song.new({ title: 'Back in Black', album: 'Back in Black', genre: 'Rock', date: '1980' }) }
  let(:song2) { MPD::Song.new({ title: 'Highway to Hell', album: 'Highway to Hell', genre: 'Rock', date: '1979' }) }

  before do
    MPDClient.conn.stub(:queue).and_return([song1, song2])
  end

  describe "#queue" do
    it "returns the list of songs" do
      queue = subject.queue
      expect(queue).to have(2).items
    end
  end

  describe "#playing?" do
    let(:playing_song) { subject.new(song1) }
    let(:not_playing_song) { subject.new(song2) }

    before do
      MPDClient.conn.stub(:current_song).and_return(song1)
    end

    it "should be true when the song is playing" do
      playing_song.playing?.should eq(true)
    end

    it "should be false when the song is not playing" do
      not_playing_song.playing?.should eq(false)
    end
  end
end
