can.Component.extend({

  tag: 'mpd-panel-artists',

  template: can.view('views/panels/artists.mustache'),

  init: function() {
    var self = this;
    Artist.findAll({}, function(data) {
      console.log(data);
      self.scope.attr('items', data);
      self._control.element.trigger('showPanel', self.scope.depth);
    });
  },

  scope: {
    depth: "@"
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
