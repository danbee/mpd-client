source 'https://rubygems.org'

ruby '2.0.0'

# todo: get everything working before going whole hog with the gem
# gemspec

gem 'sinatra'
gem 'sinatra-contrib'
gem 'sinatra-asset-pipeline'
gem 'foreman'
gem 'ruby-mpd', git: 'git@github.com:archSeer/ruby-mpd.git'
gem 'active_support', require: false

group :development, :test do
  gem 'pry'
  gem 'jasmine'
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
