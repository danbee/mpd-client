can.Component.extend({

  tag: 'mpd-panel',

  template: can.view('views/panel.mustache'),

  scope: {
    show: '@',
    depth: '@',
    artist: '@',
    album: '@',
    title: function() {
      if (this.show == 'root')
        return 'Library';
    },
    fetchItems: {
      root: new can.Map,
      artists: function() { return Artist.findAll({}) },
      albums: function() { Album.findAll({ artist: this.artist }) },
      songs: function() { Song.findAll({ artist: this.artist, album: this.album }) }
    }
  },

  events: {},

  helpers: {
    renderItems: function() {
      return can.view.render('views/library/' + this.show, {});
    }
  }

});
