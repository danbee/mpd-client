require 'spec_helper'

describe MPDClient::Connection do

  subject { MPDClient::Connection }

  let(:conn) { subject.new('localhost', 6600) }

  describe "#each_conn" do
    let(:fake_users) { [1, 2, 3] }
    it "enumerates the connected users" do
      fake_users.each {|n| conn.connected_users << n }
      conn.each_conn.to_a.should eq(fake_users)
    end
  end

  describe "#connected_users" do
    it "doesn't allow duplicate connections" do
      3.times { conn.connected_users << "user" }
      conn.connected_users.should have(1).item
    end
  end
end
