var QueueSong = can.Model({
  findAll: 'GET /api/queue'
}, {});

QueueSong.findAll({}, function(songs) {
  $('#queue').html(can.view('queueTemplate',
                            { songs: songs }));
}, function(xhr) {

});

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
