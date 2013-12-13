var Pane = can.Control.extend({

  init: function(element, data) {
    this.element = element;
    this.element.addClass(data.show);
    this.data = data;
    this.setPosition(data.pos);
    this.renderPane[data.show].call(this, data);
  },

  setPosition: function(pos) {
    var left = pos * 20;
    this.element.css('left', left + 'em');
  },

  renderPane: {
    root: function() {
      this.element.html(
        can.view('views/library/root.ejs', { pane: 0 })
      );
      this.title = 'Library';
    },
    artists: function(data) {
      Artist.findAll({}, this.renderCallback('artists'));
      this.title = 'Artists';
    },
    albums: function(data) {
      Album.findAll({ artist: data.artist }, this.renderCallback('albums'));
      if (data.artist)
        this.title = data.artist;
      else
        this.title = 'Albums';
    },
    songs: function(data) {
      Song.findAll({ artist: data.artist, album: data.album }, this.renderCallback('songs'));
      if (data.album)
        this.title = data.album;
      else
        this.title = 'Songs';
    }
  },

  renderCallback: function(type) {
    return function(items) {
      $(this.element).html(
        can.view('views/library/' + type + '.ejs', { items: items, pane: this.data.pos }, { formatLength: timeHelpers.formatLength })
      );
    }.bind(this)
  }

});
