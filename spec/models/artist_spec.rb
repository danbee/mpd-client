require 'spec_helper'

describe Artist do

  let(:artist) { Artist.new('Alice Cooper') }

  it 'has attributes' do
    expect(artist.name).to eq('Alice Cooper')
  end

end
