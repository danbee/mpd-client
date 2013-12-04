var Queue = can.Control.extend({

  init: function(element, options) {
    element.html(can.view('views/queue.ejs', {
      queueSongs: options.queueSongs,
      status: options.status
    }));
  }

});
