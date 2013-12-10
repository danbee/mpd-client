require 'bundler'
ENV['RACK_ENV'] ||= 'development'
Bundler.require(:default, ENV['RACK_ENV'])

require 'sinatra/asset_pipeline'

require 'sass'
require 'json'
require 'cgi'

require './models/control'
require './models/album'
require './models/artist'
require './models/song'
require './models/mpd_connection'

class MPDClient < Sinatra::Base

  set server: 'thin', connections: []

  set :assets_precompile, %w(app.js app.css *.png *.jpg *.svg *.eot *.ttf *.woff)
  set :assets_prefix, 'assets'

  set mpd: MPDConnection.new

  register Sinatra::AssetPipeline

  register Sinatra::Namespace

  get '/' do
    erb :index
  end

  def send_status
    puts "Sending status"
    response = JSON({ type: 'status', data: status })
    settings.connections.each { |out| out << "data: #{response}\n\n" }
  end

  def send_queue
    puts "Sending queue"
    response = JSON({ type: 'queue', data: queue })
    settings.connections.each { |out| out << "data: #{response}\n\n" }
  end

  def send_time(elapsed, total)
    puts "Sending time"
    response = JSON({ type: 'time', data: [elapsed, total] })
    settings.connections.each { |out| out << "data: #{response}\n\n" }
  end

  puts "Registering callbacks"
  puts settings.mpd
  settings.mpd.on(:song) { |song| send_status }
  settings.mpd.on(:state) { |state| send_status }
  settings.mpd.on(:playlist) { |playlist| send_queue }
  settings.mpd.on(:time) { |elapsed, total| send_time(elapsed, total) }

  namespace '/api' do

    get '/status' do
      puts settings.mpd.object_id
      JSON settings.mpd.status
    end

    get '/stream', provides: 'text/event-stream' do
      stream :keep_open do |out|
        settings.connections << out
        out.callback { settings.connections.delete(out) }
      end
    end

    get '/albums' do
      content_type 'application/json'
      JSON Album.all.map(&:to_h)
    end

    get '/artists/:artist' do
      content_type 'application/json'
      JSON Album.by_artist(CGI.unescape(params[:artist])).sort.map(&:to_h)
    end

    #get '/albums/:album' do
      #JSON get_songs_by_album(CGI.unescape(params[:album]))
    #end

    #get '/artists/:artist/:album' do
      #JSON get_songs_by_album(CGI.unescape(params[:album]))
    #end

    get '/artists' do
      content_type 'application/json'
      JSON Artist.all.map(&:to_h)
    end

    get '/queue' do
      content_type 'application/json'
      JSON({ data: settings.mpd.queue })
    end

    put '/control/play' do
      settings.mpd.play(params[:pos])
    end

    put '/control/:action' do
      unless settings.mpd.command(params[:action].to_sym)
        not_found
      end
    end

    put '/control/volume/:value' do
      unless settings.mpd.volume(params[:value].to_i)
        status 422
      end
    end

  end

end
