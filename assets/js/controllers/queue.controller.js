mpdClient.controller('queue', function ($scope, api, serverEvents) {
  $scope.queueSongs = api.getQueue().query()

  $scope.updateQueue = function (data) {
    $scope.queueSongs = data
  }

  $scope.playTrack = api.playTrack

  $scope.updatePlaying = function (songid) {
    $scope.queueSongs.forEach(function (song) {
      if (song.id == songid) { song.playing = true }
      else if (song.playing == true) { song.playing = false }
    })
  }

  $scope.$on('update:queue', function (evt, data) { $scope.updateQueue(data) })
  $scope.$on('update:status', function (evt, data) { $scope.updatePlaying(data.songid) })
})
