// Set up necessary events and startup stuff
$(document).ready(function() {

  $.when(QueueSong.findAll(), Status.findOne()).then(function(queueSongs, status) {

    window.mpdClient = {
      status: status,
      queueSongs: queueSongs,

      transport: new Transport('#transport', {
        status: status
      }),

      library: new Library('#library'),

      events: new Events(queueSongs, status),

      queue: new Queue('#queue', {
        queueSongs: queueSongs,
        status: status
      })
    };

  });

});
