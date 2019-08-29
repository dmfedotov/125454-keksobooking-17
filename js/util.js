'use strict';

(function () {
  var Pin = {
    MIN: 130,
    MAX: 630,
    HEIGHT: 81,
    SHIFT: 65 / 2
  };

  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pin--main');

  window.util = {
    pin: Pin,
    map: map,
    mapPin: mapPin,

    isEscEvent: function (evt) {
      return evt.keyCode === KeyCode.ESC;
    },
    getRandomNum: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
  };
})();