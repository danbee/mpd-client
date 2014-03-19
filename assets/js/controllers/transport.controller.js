mpdClient.controller('transport', function ($rootScope, $scope, $http) {
  var Status = $http({ method: 'GET', url: '/api/status' })

  $rootScope.status = { time: [] }

  Status.success(function (data, status, headers, config) {
    $rootScope.status = data
  })

  $scope.sendCommand = function (command) {
    $http({ method: 'PUT', url: '/api/control/' + command })
  }

  $scope.playing = function () {
    return $scope.status.state == 'play'
  }
})
