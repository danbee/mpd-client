can.Component.extend({

  tag: 'mpd-client',

  template: can.view('views/app.mustache'),

  scope: {
    queueSongs: new QueueSong.List(),
    status: new can.Map()
  },

  events: {
    init: function(element, options) {
      Status.findOne({}, this.updateStatus.bind(this));
      this.fetch();
    },

    fetch: function() {
      var self = this;
      QueueSong.findAll().then(function(songs) {
        self.update(songs);
      });
    },

    updateStatus: function(result) {
      this.scope.attr('status', result);
    },

    update: function(songs) {
      this.scope.attr('queueSongs', songs);
    },

    '{scope.status} change': function() {
      this.scope.attr('queueSongs').updatePlaying(this.scope.status.song);
    }
  }

});
