mpdClient.controller('queue', function ($rootScope, $scope, $resource) {
  var Queue = $resource('/api/queue')

  $rootScope.queueSongs = Queue.query()
})
