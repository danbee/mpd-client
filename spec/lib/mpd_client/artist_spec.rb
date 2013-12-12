require 'spec_helper'

describe MPDClient::Artist do

  subject { MPDClient::Artist }

  let(:artist) { subject.new('Alice Cooper') }
  let(:artists) { ['Alice Cooper', 'Jimmy Eat World', 'Dream Theater'] }

  before do
    MPDClient.conn.stub(:artists).and_return(artists)
  end

  it 'has attributes' do
    expect(artist.name).to eq('Alice Cooper')
  end

  it 'returns all artists' do
    expect(subject.all).to have(3).items
    expect(subject.all.map(&:name)).to eq(artists.sort)
  end

end
