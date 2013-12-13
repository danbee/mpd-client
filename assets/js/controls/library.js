var Library = can.Control.extend({

  init: function(element, options) {
    this.element = element;
    this.browser = new can.Model({ title: 'Library', currentPane: 1 });
    element.html(
      can.view('views/library.ejs', { browser: this.browser })
    );
    var rootControl = new Pane('#library .root', { show: 'root' });
    this.panes = new can.List([rootControl]);
  },

  show: function() {
    $(this.element).addClass('show');
  },

  hide: function() {
    $(this.element).removeClass('show');
  },

  nextPane: function() {
    this.browser.attr('currentPane', this.browser.attr('currentPane') + 1);
  },

  previousPane: function() {
    this.browser.attr('currentPane', this.browser.attr('currentPane') - 1);
  },

  addPane: function(data) {
    var newElement = document.createElement('div');
    $('.browser', this.element).append(newElement);
    data['pos'] = this.panes.length + 1;
    var newPane = new Pane(newElement, data);
    this.panes.push(newPane);
    this.browser.attr('title', newPane.title);
    this.nextPane();
  },

  'a.close click': 'hide',

  'route': function(data) {
    this.hide();
  },

  ':page route': function(data) {
    if (data.page == 'library') {
      this.show();
      if (data.show) {
        this.addPane(data);
      }
    }
  }

});

var Pane = can.Control.extend({

  init: function(element, data) {
    this.element = element;
    this.element.addClass(data.show);
    var left = (data.pos - 1) * 20;
    this.element.css('left', left + 'em');
    this.data = data;
    this.renderPane[data.show].call(this, data);
  },

  renderPane: {
    root: function() {
      this.element.html(
        can.view('views/library/root.ejs', {})
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
        can.view('views/library/' + type + '.ejs', { items: items })
      );
    }.bind(this)
  }

});
