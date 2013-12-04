var QueueSong = can.Model.extend({

  findAll: 'GET /api/queue'

}, {});

QueueSong.List = can.List.extend({

  updatePlaying: function(oldVal, newVal) {
    this.attr(oldVal).attr('playing', false);
    this.attr(newVal).attr('playing', true);
  }

});
