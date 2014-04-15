mpdClient.controller('library', function ($scope, api) {
  $scope.show = false

  $scope.$on('library:show', function () { $scope.show = true })

  $scope.hide = function () { $scope.show = false }
})
