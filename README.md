MPD Client
==========

MPD Client built with Sinatra and AngularJS. Uses Server-Sent Events for updating
the interface in realtime.

What is MPD?
------------

Music Player Daemon (MPD) is a flexible, powerful, server-side application for playing music. Through plugins and libraries it can play a variety of sound files while being controlled by its network protocol.

Find out more at <http://www.musicpd.org>.

Instructions
------------

1. Install and configure MPD. You're on your own with this one.
2. Install dependencies with `bundle install`.
3. Run server with `bundle exec thin start`.
4. Connect to <http://localhost:3000> with your browser.
5. Profit!

Todo
----

- Library browser
- Queue editing
- Tests
- Better name
