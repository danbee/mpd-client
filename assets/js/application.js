// Set up necessary events and startup stuff
$(document).ready(function() {

  $.when(QueueSong.findAll(), Status.findOne()).then(function(queueSongs, status) {

    window.mpdClient = {
      status: status,
      queueSongs: queueSongs,

      transport: new Transport('#transport', {
        status: status
      }),

      events: new EventSource('/api/stream'),

      queue: new Queue('#queue', {
        queueSongs: queueSongs,
        status: status
      })
    };

    mpdClient.events.onmessage = function(e) {
      newStatus = JSON.parse(e.data);
      status.attr(newStatus);
    }

    status.bind('change', function(event, attr, how, newVal, oldVal) {
      if (attr == 'song') {
        mpdClient.queueSongs.updatePlaying(oldVal, newVal);
      }
    });

  });

});
