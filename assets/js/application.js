var QueueSong = can.Model({
  findAll: 'GET /api/queue'
}, {});

var queueSongs = new can.List();

// Update the queue display when the queueSongs list changes
queueSongs.bind('change', function(event) {
  $('#queue').html(can.view('queueTemplate',
                            { songs: this }));
});

// Get the songs currently in the queue
QueueSong.findAll({}, function(songs) {
  queueSongs.replace(songs);
}, function(xhr) {
  console.log("An error occured with the request.");
});

var updatePlaying = function(queue, index) {
  queue.forEach(function(element) {
    element.attr('playing', false);
  });
  item = queue.attr(index);
  item.attr('playing', true);
}

// Set up necessary events and startup stuff
$(document).ready(function() {
  // Bind transport click events.
  $('#transport').on('click', '#controls button', function(e) {
    e.preventDefault();
    var action = $(e.currentTarget).data('action');
    can.ajax({ url: '/api/control/'+action, type: 'PUT' });
  });

  // Render transport
  $('#transport').html(can.view('transportTemplate'));
});
