can.Component.extend({

  tag: 'mpd-library',

  template: can.view('views/library.mustache'),

  scope: {
    currentPane: 0
  },

  events: {
    show: function() {
      $(this.element).addClass('show');
    },

    hide: function() {
      $(this.element).removeClass('show');
    },

    'route': function(data) {
      this.hide();
    },

    ':type route': function(data) {
      if (data.type == 'library') {
        this.show();
        if (data.pane > this.currentPane) {
          this.addPane(data);
        }
        else if (data.pane < this.currentPane) {
          this.removePane(data);
        }
      }
    }
  }

});
