require 'spec_helper'

describe MPDClient do

  subject { MPDClient }

  before do
    subject.connect!
  end

  describe "#listen" do
    it "exposes `Connection#on` for easy event listening" do
      subject.conn.should_receive(:on).exactly(3).times

      subject.listen do
        on(:first) { "something" }
        on(:second) { "something" }
        on(:third) { "something" }
      end
    end
  end

end
