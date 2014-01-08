var Server = can.Construct.extend({

  init: function() {
    this.eventSource = new EventSource('/api/stream')
  },

  onMessage: function(callback) {
    this.eventSource.addEventListener('message', function(event) {
      var response = JSON.parse(event.data);
      callback(response);
    });
  },

  sendCommand: function(command) {
    can.ajax({
      url: '/api/control/' + command,
      type: 'PUT'
    });
  },

  playSong: function(pos) {
    can.ajax({
      url: '/api/control/play',
      data: { pos: pos },
      type: 'PUT'
    });
  }

});

window.server = new Server();
