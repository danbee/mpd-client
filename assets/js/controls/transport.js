var Transport = can.Control.extend({

  init: function(element) {
    element.html(can.view('views/transport.ejs'));
  },

  sendCommand: function(command) {
    can.ajax({ url: '/api/control/'+command, type: 'PUT' });
  },

  'button click': function(element, event) {
    var command = $(element).data('command');
    this.sendCommand(command);
  }

});
