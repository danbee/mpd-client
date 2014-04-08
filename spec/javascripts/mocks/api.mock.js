var mockApi = {
  getQueue: function () {
    return {
      query: function () {
        return [
          { "id": 116,
            "track": 1,
            "artist": "Porcupine Tree",
            "album": "In Absentia",
            "title": "Drown With Me",
            "length": 322,
            "pos": 0,
            "playing": true },
          { "id": 117,
            "track": 1,
            "artist": "Porcupine Tree",
            "album": "In Absentia",
            "title": "Blackest Eyes",
            "length": 263,
            "pos": 1,
            "playing": false }
        ]
      }
    }
  },

  getStatus: function () {
    return {
      success: function (callback) {
        callback({
          "volume": 100,
          "repeat": true,
          "random": false,
          "single": false,
          "consume": false,
          "playlist": 237,
          "playlistlength": 15,
          "xfade": 0,
          "mixrampdb": 0,
          "mixrampdelay": 0,
          "state": "play",
          "time": [80, 160],
          "song": 8,
          "songid": 124,
          "nextsong": 9,
          "nextsongid": 125
        }, null, {}, {})
      }
    }
  }
}
