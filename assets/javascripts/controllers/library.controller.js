mpdClient.controller('library', function ($scope, api) {
  $scope.show = false

  $scope.title = 'Library'

  $scope.$on('library:show', function () { $scope.show = true })

  $scope.hide = function () { $scope.show = false }

  var rootPane = {
    path: '/root',
    title: 'Library',
    entries: [
      { label: 'Artists', path: '/artists' },
      { label: 'Albums', path: '/albums' },
      { label: 'Songs', path: '/songs' }
    ]
  }

  $scope.panes = [rootPane]
  $scope.currentPanelTemplate = 'panels/root.html'
  $scope.currentPaneIndex = 0

  $scope.currentPane = function () {
    return $scope.panes[$scope.currentPaneIndex]
  }

  $scope.setPane = function() {
    $scope.title = $scope.currentPane().title
    $scope.currentPanelTemplate = 'panels' + $scope.currentPane().path + '.html'
  }

  $scope.newPane = function (path, params, queryParams) {
    newPane = {
      path: path,
      title: params.title,
      entries: api.getItems(path).query(queryParams)
    }

    $scope.panes.push(newPane)
    $scope.currentPaneIndex += 1

    $scope.setPane()
  }

  $scope.back = function() {
    $scope.panes.pop()
    $scope.currentPaneIndex -= 1

    $scope.setPane()
  }
})
