source 'https://rubygems.org'

ruby '2.0.0'

gem 'sinatra'
gem 'sinatra-contrib'
gem 'sinatra-asset-pipeline'
gem 'foreman'

gem 'ruby-mpd', git: 'git@github.com:archSeer/ruby-mpd.git'

group :development, :test do
  gem 'pry'
end

group :test do
  gem 'rspec'
  gem 'rspec-mocks'
end

group :development do
  gem 'shotgun'
end

group :production do
  gem 'thin'
end
