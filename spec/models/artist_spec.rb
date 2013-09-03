require 'spec_helper'

describe Artist do

  let(:artist) { Artist.new('Alice Cooper') }
  let(:artists) { ['Alice Cooper', 'Jimmy Eat World', 'Dream Theater'] }

  it 'has attributes' do
    expect(artist.name).to eq('Alice Cooper')
  end

  it 'returns all artists' do
    MPDConnection.mpd.stub(:artists).and_return(artists)
    expect(Artist.all).to have(3).items
    expect(Artist.all.map(&:name)).to eq(artists.sort)
  end

end
