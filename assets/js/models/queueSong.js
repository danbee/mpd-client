var QueueSong = can.Model.extend({

  findAll: 'GET /api/queue'

}, {

  formattedLength: function() {
    return timeHelpers.formatLength(this.length)
  }

});

QueueSong.List = can.List.extend({

  updatePlaying: function(newSong) {
    this.each(function(item) {
      item.attr('playing', false);
    });
    this.attr(newSong).attr('playing', true);
  }

});
