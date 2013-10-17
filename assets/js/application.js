var App = Ember.Application.create();

App.QueueRoute = Ember.Route.extend({
  model: function() {
    return Ember.$.getJSON('/api/queue');
  }
});

App.ControlsController = Ember.Controller.extend({
  actions: {
    previous: function() { return Ember.$.ajax('/api/control/previous', { type: 'PUT' }); },
    play:     function() { return Ember.$.ajax('/api/control/play', { type: 'PUT' }); },
    pause:    function() { return Ember.$.ajax('/api/control/pause', { type: 'PUT' }); },
    stop:     function() { return Ember.$.ajax('/api/control/stop', { type: 'PUT' }); },
    next:     function() { return Ember.$.ajax('/api/control/next', { type: 'PUT' }); }
  }
});
