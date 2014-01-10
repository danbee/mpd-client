can.Component.extend({

  tag: 'mpd-panel-albums',

  template: can.view('views/panels/albums.mustache'),

  scope: {
    depth: "@",
    artist: "@",
    title: function() {
      if (this.artist !== undefined) {
        return this.artist;
      }
      else {
        return 'Albums';
      }
    }
  },

  events: {
    init: function() {
      var self = this;
      Album.findAll({ artist: this.scope.artist }, function(data) {
        self.scope.attr('items', data);
        self.element.trigger('switchPanel', self.scope.depth);
      });
    }
  },

  helpers: {
    link: function(item) {
      return can.route.link(item.title, {
        type: 'library',
        show: 'songs',
        artist: item.artist,
        album: item.title,
        depth: +this.depth + 1
      });
    },
  }

});
