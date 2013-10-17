var App = Ember.Application.create();

App.QueueRoute = Ember.Route.extend({
  model: function() {
    return Ember.$.getJSON('/api/queue');
  }
});
