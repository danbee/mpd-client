var QueueSong = can.Model.extend({

  findAll: 'GET /api/queue'

}, {});

QueueSong.List = can.List.extend({

  updatePlaying: function(how, newVal, oldVal) {
    if ((how == 'remove' || how == 'set') && this.attr(oldVal) != undefined) {
      this.attr(oldVal).attr('playing', false);
    }
    if (how == 'add' || how == 'set') {
      this.attr(newVal).attr('playing', true);
    }
  }

});
