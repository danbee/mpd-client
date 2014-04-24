mpdClient.factory('api', function ($rootScope, $http, $resource) {

  var apiUrl = '/api'

  return {
    sendCommand: function (command) {
      $http({ method: 'PUT', url: apiUrl + '/control/' + command })
    },

    playTrack: function (pos) {
      $http({ method: 'PUT', url: apiUrl + '/control/play', params: { pos: pos } })
    },

    getStatus: function () {
      return $http({ method: 'GET', url: apiUrl + '/status' })
    },

    getQueue: function () {
      return $resource(apiUrl + '/queue')
    },

    getItems: function (path) {
      return $resource(apiUrl + path)
    }
  }
})
