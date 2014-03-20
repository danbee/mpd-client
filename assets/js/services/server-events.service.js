mpdClient.factory('serverEvents', function ($rootScope) {

  var events = new EventSource('/api/stream'),
      serverEvents = {
        onUpdateQueue: function (callback) {
          this.updateQueueCallback = callback
        },
        onUpdateStatus: function (callback) {
          this.updateStatusCallback = callback
        },
        onUpdateTime: function (callback) {
          this.updateTimeCallback = callback
        }
      }

  events.onmessage = function(e) {
    response = JSON.parse(e.data);
    switch (response.type) {
      case 'status':
        $rootScope.$apply(function () { serverEvents.updateStatusCallback(response.data) })
      break;
      case 'queue':
        $rootScope.$apply(function () { serverEvents.updateQueueCallback(response.data) })
      break;
      case 'time':
        $rootScope.$apply(function () { serverEvents.updateTimeCallback(response.data) })
      break;
    }
  }

  return serverEvents
})
