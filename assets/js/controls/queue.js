var Queue = can.Control.extend({

  init: function(element, options) {
    element.html(can.view('views/queue.ejs', {
      queueSongs: options.queueSongs,
      status: options.status
    }));
  },

  playSong: function(pos) {
    can.ajax({
      url: '/api/control/play',
      data: { pos: pos },
      type: 'PUT'
    });
  },

  'li click': function(element, event) {
    var pos = $(element).data('pos');
    this.playSong(pos);
  }

});
