can.Component.extend({

  tag: 'mpd-panel',

  template: can.view('views/panel.mustache'),

  scope: {
    show: '@',
    depth: '@',
    artist: '@',
    album: '@',
    title: function() {
      if (this.show == 'root') return 'Library';
    },
    fetchItems: {
      root: new can.List(['Artists', 'Albums', 'Songs']),
      artists: function() { return Artist.findAll({}) },
      albums: function() { Album.findAll({ artist: this.artist }) },
      songs: function() { Song.findAll({ artist: this.artist, album: this.album }) }
    }
  },

  events: {
  },

  helpers: {
    renderItems: function() {
      return can.view.render('views/library/' + this.show, {
        items: this.fetchItems.root
      });
    },

    rootLink: function(label, show) {
      return can.route.link(label, {
        type: 'library', show: show
      });
    }
  }

});
