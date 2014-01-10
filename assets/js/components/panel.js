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
      root: [
        { label: 'Artists', show: 'artists' },
        { label: 'Albums', show: 'albums' },
        { label: 'Songs', show: 'songs' }
      ],
      artists: function() { return Artist.findAll({}) },
      albums: function() { Album.findAll({ artist: this.artist }) },
      songs: function() { Song.findAll({ artist: this.artist, album: this.album }) }
    }
  },

  helpers: {
    renderItems: function() {
      return can.view.render('views/library/' + this.show, {
        items: this.fetchItems.root
      });
    },

    rootLink: function(item) {
      console.log(item);
      return can.route.link(item.label, {
        type: 'library',
        show: item.show,
        depth: +this.depth + 1
      });
    },

    artistLink: function(item) {
      return can.route.link(item.attr('name'), {
        page: 'library',
        show: 'albums',
        depth: console.log(this),
        artist: item.attr('name')
      })
    }
  }

});
