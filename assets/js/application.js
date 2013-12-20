// Set up necessary events and startup stuff
$(document).ready(function() {

  //$.when(QueueSong.findAll(), Status.findOne()).then(function(queueSongs, status) {

    //window.mpdClient = {
      //status: status,
      //queueSongs: queueSongs,

      //transport: new Transport('#transport', {
        //status: status
      //}),

      //library: new Library('#library'),

      //events: new Events(queueSongs, status),

      //queue: new Queue('#queue', {
        //queueSongs: queueSongs,
        //status: status
      //})
    //};

  //});

  // Render the application template. Components should take care of the rest.
  var template = can.view.mustache("<mpd-client></mpd-client>");
  $(document.body).append(template());

});
