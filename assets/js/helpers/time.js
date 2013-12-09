window.timeHelpers = {
  formatLength: function(length) {
    var minutes = Math.floor(length / 60);
    var seconds = length % 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  }
}
