mpdClient.controller('library', function ($scope, api) {
  $scope.show = false

  $scope.$on('library:show', function () { $scope.show = true })

  $scope.hide = function () { $scope.show = false }

  var rootPane = {
    title: 'Library',
    entries: [
      { label: 'Artists', path: '/artists' },
      { label: 'Albums', path: '/albums' },
      { label: 'Songs', path: '/songs' }
    ]
  }

  $scope.panes = [rootPane]

  $scope.currentPaneIndex = 0

  $scope.currentPane = function () {
    return $scope.panes[$scope.currentPaneIndex]
  }

  $scope.newPane = function (path, params) {
    console.log(path)
  }
})
