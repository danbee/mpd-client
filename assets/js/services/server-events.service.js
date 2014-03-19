mpdClient.factory('serverEvents', function () {
  var events = new EventSource('/api/stream'),
      serverEvents = {
        onUpdateStatus: function (callback) {
          this.onUpdateStatusCallback = callback
        }
      }

  events.onmessage = function(e) {
    response = JSON.parse(e.data);
    switch (response.type) {
      case 'status':
        serverEvents.onUpdateStatusCallback(response.data)
      break;
      case 'queue':
        $scope.$emit('update:queue', response.data)
      break;
      case 'time':
        $scope.$emit('update:time', response.data);
      break;
    }
  }

  return serverEvents
})
