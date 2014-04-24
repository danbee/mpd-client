mpdClient.controller('mpd-client', function ($rootScope, $scope) {
  $scope.showLibrary = function () { $scope.$broadcast('library:show') }
})
