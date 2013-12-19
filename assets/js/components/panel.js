can.Component.extend({

  init: function() {
    console.log('Initializing');
  },

  tag: 'panel',

  template: can.view('views/panel.mustache'),

  scope: {
    show: '@',
    artist: '@',
    album: '@',
    title: function() {
      if (this.show == 'root')
        return 'Library';
    },
    fetchItems: {
      root: new can.Map,
      artists: Artist.findAll({}),
      albums: Album.findAll({ artist: this.artist }),
      songs: Song.findAll({ artist: this.artist, album: this.album })
    }
  },

  events: {
    inserted: function() {
      console.log('Panel inserted.');
    }
  },

  helpers: {
    renderItems: function() {
      return can.view.render('views/library/' + this.show, {});
    }
  }

});
