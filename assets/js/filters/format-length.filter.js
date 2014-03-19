mpdClient.filter('formatLength', function () {
  return function (length) {
    if (!length) {
      return '--:--'
    }
    var minutes = Math.floor(length / 60);
    var seconds = length % 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  }
})
