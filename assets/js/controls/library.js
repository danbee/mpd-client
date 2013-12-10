var Library = can.Control.extend({

  init: function(element, options) {
    element.html(
      can.view( 'views/library.ejs')
    );
  }

});
