var Events = can.Construct.extend({

  init: function(scope) {
    this.events = new EventSource('/api/stream')

    self = this

    this.events.onmessage = function(e) {
      response = JSON.parse(e.data);
      switch (response.type) {
        case 'status':
          scope.attr('status').attr(response.data);
          break;
        case 'queue':
          scope.attr('queueSongs', response.data);
          break;
        case 'time':
          scope.attr('status.time', response.data);
          break;
      }
    }
  },

});
