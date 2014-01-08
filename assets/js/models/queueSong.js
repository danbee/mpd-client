var QueueSong = can.Model.extend({

  findAll: 'GET /api/queue'

}, {

  formattedLength: function() {
    return timeHelpers.formatLength(this.length)
  }

});

QueueSong.List = can.List.extend({

  init: function() {
    server.eventSource.addEventListener('message', this.updateQueue.bind(this));
  },

  updateQueue: function(event) {
    var response = JSON.parse(event.data);
    if (response.type === 'queue') {
      this.attr(response.data, true);
    }
  },

  updatePlaying: function(newSong) {
    this.each(function(item) {
      item.attr('playing', false);
    });
    this.attr(newSong).attr('playing', true);
  }

});
