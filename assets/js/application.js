// Set up necessary events and startup stuff
$(document).ready(function() {

  $.when(QueueSong.findAll(), Status.findOne()).then(function(queueSongs, status) {

    window.mpdClient = {
      status: status,
      queueSongs: queueSongs,

      transport: new Transport('#transport', {
        status: status
      }),

      queue: new Queue('#queue', {
        queueSongs: queueSongs,
        status: status
      })
    };

    status.bind('change', function(event, attr, how, newVal, oldVal) {
      if (attr == 'songid') {
        mpdClient.queueSongs.updatePlaying(oldVal, newVal);
      }
    });

  });

});
