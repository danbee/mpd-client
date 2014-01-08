can.Component.extend({

  tag: 'mpd-transport',

  template: can.view('views/transport.mustache'),

  events: {
    sendCommand: function(command) {
      can.ajax({
        url: '/api/control/' + command,
        type: 'PUT'
      });
    },

    'button click': function(element, event) {
      var command = $(element).data('command');
      this.sendCommand(command);
      $(element).blur();
    }
  }

});
