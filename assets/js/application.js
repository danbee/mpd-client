var App = Ember.Application.create();

App.QueueRoute = Ember.Route.extend({
  model: function() {
    return Ember.$.getJSON('/api/queue');
  }
});

App.QueueController = Ember.ArrayController.extend();

App.TransportController = Ember.Controller.extend({
  actions: {
    sendControl: function(control) {
      Ember.$.ajax('/api/control/' + control, { type: 'PUT' });
    }
  }
});

App.Song = DS.Model.extend();
