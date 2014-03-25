mpdClient.factory('serverEvents', function ($rootScope) {

  var events = new EventSource('/api/stream')

  events.onmessage = function(e) {
    response = JSON.parse(e.data);
    $rootScope.$apply(function() {
      $rootScope.$broadcast('update:' + response.type, response.data)
    })
  }
})
