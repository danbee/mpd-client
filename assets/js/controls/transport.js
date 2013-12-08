var Transport = can.Control.extend({

  init: function(element, options) {
    this.status = options.status;
    element.html(can.view('views/transport.ejs', { status: this.status }));
  },

  updateStatus: function(status) {
    this.status.attr(status);
  },

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

});
