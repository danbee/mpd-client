require 'spec_helper'

describe Album do

  let(:song1) { MPD::Song.new({ album: 'Back in Black', genre: 'Rock', date: '1980' }) }
  let(:song2) { MPD::Song.new({ album: 'Highway to Hell', genre: 'Rock', date: '1979' }) }

  before do
    MPDConnection.mpd.stub(:albums).and_return([song1.album, song2.album])
    MPDConnection.mpd.stub(:search).and_return([song1, song2])
    MPDConnection.mpd.stub(:search).with(:album, song1.album).and_return([song1])
    MPDConnection.mpd.stub(:search).with(:album, song2.album).and_return([song2])
  end

  it 'has attributes based on first song' do
    album = Album.new(song1.album)
    expect(album.title).to eq(song1.album)
    expect(album.genre).to eq(song1.genre)
    expect(album.year).to eq(song1.date)
  end

  it 'should return a list of albums' do
    expect(Album.by_artist('AC/DC')).to have(2).items
  end

  it 'should sort the albums by year' do
    albums = Album.by_artist('AC/DC')
    expect(albums.sort.map(&:year)).to eq(['1979', '1980'])
  end

end
