var Transport = can.Control.extend({

  init: function(element, options) {
    this.status = options.status;
    element.html(can.view('views/transport.ejs'));
  },

  updateStatus: function(status) {
    this.status.attr(status);
  },

  sendCommand: function(command) {
    var self = this;
    can.ajax({
      url: '/api/control/' + command,
      type: 'PUT',
      success: function(status) {
        self.updateStatus(status);
      }
    });
  },

  'button click': function(element, event) {
    var command = $(element).data('command');
    this.sendCommand(command);
  }

});
