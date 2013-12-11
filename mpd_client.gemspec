# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'mpd_client/version'

Gem::Specification.new do |spec|
  spec.name          = "mpd_client"
  spec.version       = MPDClient::VERSION
  spec.authors       = ["Dan Barber", "Lee Machin"]
  spec.email         = ["dan@new-bamboo.co.uk", "lee@new-bamboo.co.uk"]
  spec.description   = %q{Tasty web interface for MPD}
  spec.summary       = %q{Tasty web interface for MPD}
  spec.homepage      = ""

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "rspec"
  spec.add_development_dependency "rspec-mocks"
  spec.add_development_dependency "pry"

  spec.add_dependency "thin"
  spec.add_dependency "sinatra"
  spec.add_dependency "sinatra-contrib"
  spec.add_dependency "sinatra-asset-pipeline"
  spec.add_dependency "ruby-mpd"
  spec.add_dependency "active_support"
end
