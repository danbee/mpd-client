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
  }
}
