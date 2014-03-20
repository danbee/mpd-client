mpdClient.controller('queue', function ($rootScope, $scope, $resource, serverEvents) {
  var Queue = $resource('/api/queue')

  $rootScope.queueSongs = Queue.query()

  $scope.updateQueue = function(data) {
    $rootScope.queueSongs = data
  }

  serverEvents.onUpdateQueue($scope.updateQueue)
})
