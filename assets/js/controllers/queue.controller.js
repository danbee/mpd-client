mpdClient.controller('queue', function ($scope, $resource, serverEvents) {
  var Queue = $resource('/api/queue')

  $scope.queueSongs = Queue.query()

  $scope.updateQueue = function(data) {
    $scope.queueSongs = data
  }

  serverEvents.onUpdateQueue($scope.updateQueue)
})
