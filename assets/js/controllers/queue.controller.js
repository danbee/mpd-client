mpdClient.controller('queue', function ($scope, $resource, api, serverEvents) {
  $scope.queueSongs = api.getQueue().query()

  $scope.updateQueue = function(data) {
    $scope.queueSongs = data
  }

  serverEvents.onUpdateQueue($scope.updateQueue)
})
