var Library = can.Control.extend({

  init: function(element, options) {
    this.element = element;
    this.browser = new can.Model({ pane: 1 });
    element.html(
      can.view('views/library.ejs', { browser: this.browser })
    );
    var rootControl = new Pane('#library .root', { show: 'root' })
    this.panes = new can.List([rootControl]);
  },

  show: function() {
    $(this.element).addClass('show');
  },

  hide: function() {
    $(this.element).removeClass('show');
  },

  nextPane: function() {
    this.browser.attr('pane', this.browser.attr('pane') + 1);
  },

  previousPane: function() {
    this.browser.attr('pane', this.browser.attr('pane') - 1);
  },

  'a.close click': 'hide',

  ':page route': function(data) {
    if (data.page == 'library') {
      this.show();
    }
  }

});

var Pane = can.Control.extend({

  init: function(element, data, pane) {
    this.element = element;
    this.data = data;
    this.renderPane[data.show].call(this, data);
  },

  renderPane: {
    root: function() {
      this.element.html(
        can.view('views/library/root.ejs', {})
      );
    },
    artists: function(data) {
      Artist.findAll({}, renderCallback('artists'));
    },
    albums: function(data) {
      Album.findAll({ artist: data.artist }, renderCallback('albums'));
    },
    songs: function(data) {
      Song.findAll({ artist: data.artist, album: data.album }, renderCallback('songs'));
    }
  },

  renderCallback: function(type) {
    return function(items) {
      $(this.element).html(
        can.view('views/library/' + type + '.ejs', { items: items })
      );
    }.bind(this)
  }

});
