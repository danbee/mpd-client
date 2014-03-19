mpdClient.controller('transport', function ($rootScope, $scope, $http, serverEvents) {
  var Status = $http({ method: 'GET', url: '/api/status' })

  $rootScope.status = { time: [] }

  serverEvents.onUpdateStatus($scope.updateStatus)

  Status.success(function (data, status, headers, config) {
    $scope.updateStatus(data)
  })

  $scope.updateStatus = function(data) {
    $rootScope.status = data
  }

  $scope.sendCommand = function (command) {
    $http({ method: 'PUT', url: '/api/control/' + command })
  }

  $scope.playing = function () {
    return $scope.status.state == 'play'
  }
})
