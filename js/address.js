'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var addressField = form.querySelector('#address');

  var fillAddress = function (pageState) {
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

  var setDefaultAddress = function () {
    var addressX = parseInt(window.pins.userPin.style.left, 10);
    var addressY = parseInt(window.pins.userPin.style.top, 10);
    addressField.value = addressX + ', ' + addressY;
  };

  window.address = {
    adsForm: form,
    fill: fillAddress,
    setDefault: setDefaultAddress
  };
})();
