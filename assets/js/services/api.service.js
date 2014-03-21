mpdClient.factory('api', function ($rootScope, $http, $resource) {

  var apiUrl = '/api'

  return {
    sendCommand: function (command) {
      $http({ method: 'PUT', url: apiUrl + '/control/' + command })
    },

    getStatus: function () {
      return $http({ method: 'GET', url: apiUrl + '/status' })
    },

    getQueue: function () {
      return $resource(apiUrl + '/queue')
    }
  }
})
