require 'spec_helper'

describe MPDClient do
  it 'should respond to GET' do
    get '/'
    expect(last_response.status).to eq(404)
  end
end
