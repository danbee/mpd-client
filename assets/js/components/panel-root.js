can.Component.extend({

  tag: 'mpd-panel-root',

  template: can.view('views/panels/root.mustache'),

  scope: {
    depth: "@",
    items: [
      { label: 'Artists', show: 'artists' },
      { label: 'Albums', show: 'albums' },
      { label: 'Songs', show: 'songs' }
    ]
  },

  helpers: {
    link: function(item) {
      return can.route.link(item.label, {
        type: 'library',
        show: item.show,
        depth: +this.depth + 1
      });
    },
  }

});
