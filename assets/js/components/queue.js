can.Component.extend({

  tag: 'mpd-queue',

  template: can.view('views/queue.mustache'),

  events: {
    'li click': function(element, event) {
      var pos = $(element).data('pos');
      server.playSong(pos);
    }
  }

});
