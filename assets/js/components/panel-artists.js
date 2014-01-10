can.Component.extend({

  tag: 'mpd-panel-artists',

  template: can.view('views/panels/artists.mustache'),

  scope: {
    depth: "@"
  },

  events: {
    init: function() {
      var self = this;
      Artist.findAll({}, function(data) {
        self.scope.attr('items', data);
        self.element.trigger('switchPanel', self.scope.depth);
      });
    }
  },

  helpers: {
    link: function(item) {
      return can.route.link(item.name, {
        type: 'library',
        show: 'albums',
        artist: item.name,
        depth: +this.depth + 1
      });
    },
  }

});
