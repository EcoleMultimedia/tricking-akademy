(function() {
  'use strict';

  var app = {};

  // Colorbox configuration
  app.colorbox = {
    initialize: function ($selecteur, width, height) {
      // Initialisation du plugin jQuery "colorbox" :
      // On va sélectionner tous les liens portant la classe "zoomin" et leur appliquer la fonction "colorbox" fournie par le plugin.
      $selecteur.colorbox({
        iframe      : true,
        innerWidth  : width || 800,
        innerHeight : height || 400
      });
    }
  };

  // Events module configuration
  app.events = {
    setDate: function (selecteur) {
      var elements = document.querySelectorAll(selecteur),
          stamp;

      [].forEach.call(elements, function(element) {
        stamp = element.dataset.eventDate;
        element.textContent = moment(stamp).fromNow();
      });
    }
  };

  window.app = app;
})();