describe('transport controller', function() {

  var TransportController, scope

  beforeEach(module('mpdClient'))

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new()
    TransportController = $controller('transport', { $scope: scope, api: mockApi })
  }))

  it('gets the status from the API', function () {
    expect(scope.status.volume).toBe(100)
  })

  it('gets the playing status', function () {
    expect(scope.playing()).toBe(true)
    status = scope.status
    status.state = 'stop'
    scope.updateStatus(status)
    expect(scope.playing()).toBe(false)
  })

  it('gets the stopped status', function () {
    expect(scope.stopped()).toBe(false)
  })

  it('reports the correct marker position', function () {
    expect(scope.markerPosition()).toBe(50)
  })

});
