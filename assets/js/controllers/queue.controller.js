mpdClient.controller('queue', function ($scope, api, serverEvents) {
  $scope.queueSongs = api.getQueue().query()

  $scope.updateQueue = function(data) {
    $scope.queueSongs = data
  }

  serverEvents.onUpdateQueue($scope.updateQueue)
})
