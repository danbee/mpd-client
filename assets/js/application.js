var QueueSong = can.Model({
  findAll: 'GET /api/queue'
}, {});

QueueSong.findAll({}, function(songs) {
  $('#queue').html(can.view('queueTemplate',
                            { songs: songs }));
}, function(xhr) {

});

$(document).ready(function() {
  $('#transport').html(can.view('transportTemplate'));

  $('#controls button').on('click', function(e) {
  });
});
