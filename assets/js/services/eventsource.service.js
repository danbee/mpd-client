angular.module('mpdClient.services')

  .factory('eventSource', function ($scope) {
    $scope.events = new EventSource('/api/stream')

    $scope.events.onmessage = function(e) {
      response = JSON.parse(e.data);
      switch (response.type) {
        case 'status':
          $scope.$emit('update:status', response.data)
        break;
        case 'queue':
          $scope.$emit('update:queue', response.data)
        break;
        case 'time':
          $scope.$emit('update:time', response.data);
        break;
      }
    }
  })
