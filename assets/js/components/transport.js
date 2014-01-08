can.Component.extend({

  tag: 'mpd-transport',

  template: can.view('views/transport.mustache'),

  events: {
    'button click': function(element, event) {
      var command = $(element).data('command');
      server.sendCommand(command);
      $(element).blur();
    }
  }

});
