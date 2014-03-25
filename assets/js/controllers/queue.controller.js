mpdClient.controller('queue', function ($scope, api, serverEvents) {
  $scope.queueSongs = api.getQueue().query()

  $scope.updateQueue = function(data) {
    $scope.queueSongs = data
  }

  $scope.playTrack = function(id) {
    console.log(id)
  }

  $scope.$on('update:queue', function (evt, data) { $scope.updateQueue(data) })
})
