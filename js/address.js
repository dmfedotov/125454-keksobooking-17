'use strict';

(function () {
  var form = document.querySelector('.ad-form');

  var fillAddress = function (pageState) {
    var addressField = form.querySelector('#address');
    var coordX = parseInt(window.pins.userPin.style.left, 10);
    var coordY = parseInt(window.pins.userPin.style.top, 10);

    if (pageState) {
      if (coordX <= 0) {
        coordX += Math.floor(window.util.pin.SHIFT);
      } else {
        coordX += Math.round(window.util.pin.SHIFT);
      }

      coordY += window.util.pin.HEIGHT;
    }

    addressField.value = coordX + ', ' + coordY;
  };

  window.address = {
    adsForm: form,
    fill: fillAddress
  };
})();
