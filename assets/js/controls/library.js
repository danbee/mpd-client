var Library = can.Control.extend({

  init: function(element, options) {
    this.element = element;
    this.browser = new can.Model({ title: 'Library', currentPane: 0 });
    element.html(
      can.view('views/library.mustache', { browser: this.browser })
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
    var currentPane = this.browser.attr('currentPane');
    this.browser.attr('currentPane', currentPane + 1);
  },

  previousPane: function() {
    var currentPane = this.browser.attr('currentPane');
    this.browser.attr('currentPane', currentPane - 1);
  },

  setTitle: function(title) {
    this.browser.attr('title', title);
  },

  addPane: function(data) {
    var newElement = document.createElement('div');
    $('.browser', this.element).append(newElement);

    data['pos'] = this.panes.length;
    var newPane = new Pane(newElement, data);

    this.panes.push(newPane);
    this.setTitle(newPane.title);
    this.nextPane();
  },

  removePane: function(data) {
    this.previousPane();
  },

  'a.close click': 'hide',

  'route': function(data) {
    this.hide();
  },

  ':page route': function(data) {
    if (data.page == 'library') {
      this.show();
      if (data.pane > this.browser.currentPane) {
        this.addPane(data);
      }
      else if (data.pane < this.browser.currentPane) {
        this.removePane(data);
      }
    }
  }

});
