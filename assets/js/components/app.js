can.Component.extend({

  tag: 'mpd-client',

  template: can.view('views/app.mustache'),

  scope: {
    queueSongs: new can.List(),
    status: new can.Map()
  },

  events: {
    init: function(element, options) {
      this.scope.attr('events', new Events(this.scope.queueSongs, this.scope.status));
      this.fetch();
    },

    fetch: function() {
      var self = this;
      QueueSong.findAll().then(function(songs) {
        self.update(songs);
      });
    },

    update: function(songs) {
      this.scope.attr('queueSongs', songs);
    }
  }

});
