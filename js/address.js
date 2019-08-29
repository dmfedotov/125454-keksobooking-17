'use strict';

(function () {
  var adsForm = document.querySelector('.ad-form');

  window.address = {
    form: adsForm,
    fillField: function (pageState) {
      var addressField = adsForm.querySelector('#address');
      var coordX = parseInt(window.util.mapPin.style.left, 10);
      var coordY = Math.round(parseInt(window.util.mapPin.style.top, 10));

      if (pageState) {
        if (coordX <= 0) {
          coordX += Math.floor(window.util.pin.SHIFT);
        } else {
          coordX += Math.round(window.util.pin.SHIFT);
        }

        coordY += window.util.pin.HEIGHT;
      }

      addressField.value = coordX + ', ' + coordY;
    }
  };
})();
