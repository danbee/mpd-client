require 'forwardable'
require 'ruby-mpd'
require 'set'
require 'json'

module MPDClient

  autoload :Jsonable, File.expand_path('mpd_client/jsonable.rb', __dir__)
  autoload :ClassToProc, File.expand_path('mpd_client/class_to_proc.rb', __dir__)

  autoload :Connection, File.expand_path('mpd_client/connection.rb', __dir__)
  autoload :Song, File.expand_path('mpd_client/song.rb', __dir__)
  autoload :Album, File.expand_path('mpd_client/album.rb', __dir__)
  autoload :Artist, File.expand_path('mpd_client/artist.rb', __dir__)
  autoload :Control, File.expand_path('mpd_client/control.rb', __dir__)
  autoload :Queue, File.expand_path('mpd_client/queue.rb', __dir__)

  # Don't want to automatically require this thing
  autoload :Webserver, File.expand_path('mpd_client/webserver.rb', __dir__)

  MPD_HOST = ENV.fetch('MPD_HOST', 'localhost')
  MPD_PORT = ENV.fetch('MPD_PORT', 6600)

  def self.connect!
    @conn ||= Connection.new(MPD_HOST, MPD_PORT)
    @conn.connect unless @conn.connected?
    @conn
  end

  def self.conn
    @conn
  end

  def self.status
    self.conn.status
  end

  def self.listen(&block)
    self.conn.instance_eval(&block)
  end

  def self.connect_user(conn)
    self.conn.connected_users << conn
  end

  def self.disconnect_user(conn)
    self.conn.connected_users.delete(conn)
  end
end
