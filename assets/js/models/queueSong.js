var QueueSong = can.Model.extend({

  findAll: 'GET /api/queue'

}, {

  formattedLength: function() {
    return timeHelpers.formatLength(this.length)
  }

});

QueueSong.List = can.List.extend({

  init: function() {
    server.onMessage(this.updateQueue.bind(this));
  },

  updateQueue: function(response) {
    if (response.type === 'queue') {
      this.attr(response.data, true);
    }
  },

  updatePlaying: function(newSong) {
    this.each(function(item) {
      item.attr('playing', false);
    });
    if (this.attr(newSong) !== undefined) {
      this.attr(newSong).attr('playing', true);
    }
  }

});
