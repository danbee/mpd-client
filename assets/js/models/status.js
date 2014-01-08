var Status = can.Model.extend({

  findOne: 'GET /api/status'

}, {

  playing: function() {
    return this.attr('state') === 'play'
  },

  playingOrPaused: function() {
    return (this.attr('state') === 'play' || this.attr('state') === 'pause');
  },

  showTrackProgress: can.compute(function() {
    return (this.playingOrPaused() && this.attr('time') != undefined);
  }),

  formattedElapsedTime: function() {
    if (this.attr('time') != undefined) {
      return timeHelpers.formatLength(this.attr('time')[0])
    }
  },

  formattedTotalTime: function() {
    if (this.attr('time') != undefined) {
      return timeHelpers.formatLength(this.attr('time')[1])
    }
  },

  markerPosition: function() {
    return (this.attr('time')[0] / this.attr('time')[1]) * 100
  }

});
