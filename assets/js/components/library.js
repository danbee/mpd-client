can.Component.extend({

  tag: 'mpd-library',

  template: can.view('views/library.mustache'),

  events: {
    show: function() {
      $(this.element).addClass('show');
    },

    hide: function() {
      $(this.element).removeClass('show');
    },

    'a.close click': 'hide',

    ':type route': function(data) {
      if (data.type == 'library') {
        this.show();
        if (data.pane > this.browser.currentPane) {
          this.addPane(data);
        }
        else if (data.pane < this.browser.currentPane) {
          this.removePane(data);
        }
      }
    }
  }

});
