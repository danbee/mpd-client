mpdClient.controller('transport', function ($scope, api, serverEvents) {
  $scope.status = {}

  $scope.updateStatus = function(data) {
    $scope.status = data
    if (data.time) { $scope.updateTime(data.time) }
  }

  $scope.updateTime = function(data) {
    $scope.elapsedTime = data[0]
    $scope.totalTime = data[1]
  }

  $scope.sendCommand = api.sendCommand

  $scope.stopped = function () {
    return $scope.status.state == 'stop'
  }

  $scope.playing = function () {
    return $scope.status.state == 'play'
  }

  $scope.markerPosition = function () {
    return ($scope.elapsedTime / $scope.totalTime) * 100
  }

  api.getStatus().success(function (data, status, headers, config) {
    $scope.updateStatus(data)
  })

  $scope.$on('update:status', function (evt, data) { $scope.updateStatus(data) })
  $scope.$on('update:time', function (evt, data) { $scope.updateTime(data) })
})
