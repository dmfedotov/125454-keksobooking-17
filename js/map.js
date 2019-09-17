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

  var setDefaultPinPosition = function () {
    isPageActive = false;
    window.pins.userPin.style.left = window.util.pin.position.X + 'px';
    window.pins.userPin.style.top = window.util.pin.position.Y + 'px';
  };

  window.pins.userPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (!isPageActive) {
      window.changePageState(true);
      isPageActive = true;
    }

    window.pins.userPin.style.zIndex = 2;

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

      if (movePosition.y + window.util.pin.HEIGHT <= window.util.pin.MIN) {
        movePosition.y = window.util.pin.MIN - window.util.pin.HEIGHT;
      } else if (movePosition.y + window.util.pin.HEIGHT >= window.util.pin.MAX) {
        movePosition.y = window.util.pin.MAX - window.util.pin.HEIGHT;
      }

      if (movePosition.x + window.util.pin.SHIFT <= 0) {
        movePosition.x = 0 - window.util.pin.SHIFT;
      } else if (movePosition.x + window.util.pin.SHIFT >= window.pins.map.clientWidth) {
        movePosition.x = window.pins.map.clientWidth - window.util.pin.SHIFT;
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

  var onPinClick = function (evt) {
    var target = evt.target;

    if (target.parentNode.classList.contains('map__pin--main') || target.tagName !== 'IMG') {
      return;
    }
    evt.preventDefault();

    window.preview.show(evt);
  };

  window.pins.container.addEventListener('click', onPinClick);

  window.map = {
    setDefaultPinPosition: setDefaultPinPosition
  };
})();
