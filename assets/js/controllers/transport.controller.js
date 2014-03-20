mpdClient.controller('transport', function ($rootScope, $scope, $http, serverEvents) {
  var Status = $http({ method: 'GET', url: '/api/status' })

  $rootScope.status = {}

  Status.success(function (data, status, headers, config) {
    $scope.updateStatus(data)
  })

  $scope.updateStatus = function(data) {
    $rootScope.status = data
    if (data.time) { $scope.updateTime(data.time) }
  }

  $scope.updateTime = function(data) {
    $rootScope.elapsedTime = data[0]
    $rootScope.totalTime = data[1]
  }

  $scope.sendCommand = function (command) {
    $http({ method: 'PUT', url: '/api/control/' + command })
  }

  $scope.playing = function () {
    return $scope.status.state == 'play'
  }

  serverEvents.onUpdateStatus($scope.updateStatus)
  serverEvents.onUpdateTime($scope.updateTime)
})
