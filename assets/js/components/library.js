can.Component.extend({

  tag: 'mpd-library',

  template: can.view('views/library.mustache'),

  scope: {
    currentDepth: 0,
    leftPos: function() {
      var ems = - (this.attr('currentDepth') * 20);
      return ems + 'em';
    }
  },

  events: {
    show: function() {
      $(this.element).addClass('show');
    },

    hide: function() {
      $(this.element).removeClass('show');
    },

    addPanel: function(data) {
      var newPanel = can.view.mustache('<mpd-panel-' + data.show +
                                       ' depth="' + data.depth + '"' +
                                       ' style="left: ' + data.depth * 20 + 'em"' +
                                       ' artist="' + data.artist + '"' +
                                       ' album="' + data.album + '" />');
      $('.panels', this.element).append(newPanel);
    },

    'route': function(data) {
      this.hide();
    },

    ':type route': function(data) {
      if (data.type == 'library') {
        this.show();
        if (data.depth > this.scope.currentDepth) {
          this.addPanel(data);
        }
        else if (data.depth < this.scope.currentDepth) {
          this.removePanel(data);
        }
      }
    },

    ' showPanel': function(el, ev, data) {
      this.scope.attr('currentDepth', data);
    }
  }

});
