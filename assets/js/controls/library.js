var Library = can.Control.extend({

  init: function(element, options) {
    this.element = element
    element.html(
      can.view('views/library.ejs')
    );
  },

  show: function() {
    $(this.element).addClass('show');
  },

  hide: function() {
    $(this.element).removeClass('show');
  },

  'a.close click': 'hide',

  ':page route': function(data) {
    console.log(data);
    if (data.page == 'library') {
      this.show();
    }
  }

});
