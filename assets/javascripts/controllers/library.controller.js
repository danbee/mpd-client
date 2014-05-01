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

  $scope.currentPanelTemplate = 'panels/root.html'

  $scope.panes = [rootPane]

  $scope.currentPaneIndex = 0

  $scope.currentPane = function () {
    return $scope.panes[$scope.currentPaneIndex]
  }

  $scope.newPane = function (path, params, queryParams) {
    $scope.panes.push({
      path: path,
      title: params.title,
      entries: api.getItems(path).query(queryParams)
    })

    $scope.currentPaneIndex += 1
    $scope.title = params.title
    $scope.currentPanelTemplate = 'panels' + path + '.html'
  }

  $scope.back = function() {
    lastPane = $scope.panes.pop()

    currentPane = $scope.panes[$scope.panes.length - 1]

    $scope.currentPaneIndex -= 1
    $scope.title = currentPane.title
    $scope.currentPanelTemplate = 'panels' + currentPane.path + '.html'
  }
})
