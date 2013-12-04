// Set up necessary events and startup stuff
$(document).ready(function() {

  $.when(QueueSong.findAll(), Status.findOne()).then(function(queueSongs, status) {
    new Transport('#transport');
    new Queue('#queue', {
      queueSongs: queueSongs,
      status: status
    });
  });

});
