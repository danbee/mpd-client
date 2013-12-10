var Events = can.Construct.extend({

  init: function(queue, status) {
    this.events = new EventSource('/api/stream')

    self = this

    this.events.onmessage = function(e) {
      response = JSON.parse(e.data);
      console.log(response)
      switch (response.type) {
        case 'status':
          status.attr(response.data, true);
          break;
        case 'queue':
          queue.replace(response.data);
          break;
        case 'time':
          status.attr('time', response.data);
          break;
      }
    }

    status.bind('change', function(event, attr, how, newVal, oldVal) {
      if (attr == 'song') {
        queue.updatePlaying(how, newVal, oldVal);
      }
    });
  },

});
