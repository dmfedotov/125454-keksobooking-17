'use strict';

(function () {
  var Pin = {
    MIN: 130,
    MAX: 630,
    HEIGHT: 81,
    SHIFT: 65 / 2,
    position: {
      X: 570,
      Y: 375
    }
  };
  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };
  var DEBOUNCE_INTERVAL = 500;

  window.util = {
    pin: Pin,
    isEscEvent: function (evt) {
      return evt.keyCode === KeyCode.ESC;
    },
    getRandomNum: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
