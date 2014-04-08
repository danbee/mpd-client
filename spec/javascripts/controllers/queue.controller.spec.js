describe('queue controller', function() {

  var QueueController, scope

  beforeEach(module('mpdClient'))

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new()
    QueueController = $controller('queue', { $scope: scope, api: mockApi })
  }))

  it('gets queue songs from the API', function () {
    expect(scope.queueSongs.length).toBe(2)
  })

  it('sets the currently playing song', function () {
    scope.updatePlaying(scope.queueSongs[1].id)
    expect(scope.queueSongs[0].playing).toBe(false)
    expect(scope.queueSongs[1].playing).toBe(true)
  })

});
