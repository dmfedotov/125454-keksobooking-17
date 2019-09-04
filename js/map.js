'use strict';

(function () {
  var isPageActive = false;

  window.address.fill(isPageActive);
  window.changeFormState(window.filters.form, false);
  window.changeFormState(window.address.adsForm, false);

  var setPinPosition = function (valueY, valueX) {
    window.pins.userPin.style.top = valueY + 'px';
    window.pins.userPin.style.left = valueX + 'px';
  };

  window.pins.userPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (!isPageActive) {
      window.changePageState();
      isPageActive = true;
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var movePosition = {
        x: window.pins.userPin.offsetLeft - shift.x,
        y: window.pins.userPin.offsetTop - shift.y
      };

      if (movePosition.y + window.pins.userPin.HEIGHT <= window.pins.userPin.MIN) {
        movePosition.y = window.pins.userPin.MIN - window.pins.userPin.HEIGHT;
      } else if (movePosition.y + window.pins.userPin.HEIGHT >= window.pins.userPin.MAX) {
        movePosition.y = window.pins.userPin.MAX - window.pins.userPin.HEIGHT;
      }

      if (movePosition.x + window.pins.userPin.SHIFT <= 0) {
        movePosition.x = 0 - window.pins.userPin.SHIFT;
      } else if (movePosition.x + window.pins.userPin.SHIFT >= window.pins.map.clientWidth) {
        movePosition.x = window.pins.map.clientWidth - window.pins.userPin.SHIFT;
      }

      window.address.fill(window.address.adsForm, isPageActive);
      setPinPosition(movePosition.y, movePosition.x);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.address.fill(window.address.adsForm, isPageActive);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
