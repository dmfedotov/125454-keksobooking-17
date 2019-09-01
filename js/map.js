'use strict';

var adsForm = document.querySelector('.ad-form');
var filtersForm = window.util.map.querySelector('.map__filters');
var isPageActive = false;

window.fillAddress(adsForm, isPageActive);
window.changeFormState(filtersForm, false);
window.changeFormState(adsForm, false);

var setPinPosition = function (valueY, valueX) {
  window.util.mapPin.style.top = valueY + 'px';
  window.util.mapPin.style.left = valueX + 'px';
};

var onLoad = function (data) {
  window.pins.render(data);
};

window.util.mapPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  window.changePageState();
  isPageActive = window.changePageState();
  window.load(onLoad);

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
      x: window.util.mapPin.offsetLeft - shift.x,
      y: window.util.mapPin.offsetTop - shift.y
    };

    if (movePosition.y + window.util.pin.HEIGHT <= window.util.pin.MIN) {
      movePosition.y = window.util.pin.MIN - window.util.pin.HEIGHT;
    } else if (movePosition.y + window.util.pin.HEIGHT >= window.util.pin.MAX) {
      movePosition.y = window.util.pin.MAX - window.util.pin.HEIGHT;
    }

    if (movePosition.x + window.util.pin.SHIFT <= 0) {
      movePosition.x = 0 - window.util.pin.SHIFT;
    } else if (movePosition.x + window.util.pin.SHIFT >= window.util.map.clientWidth) {
      movePosition.x = window.util.map.clientWidth - window.util.pin.SHIFT;
    }

    window.fillAddress(adsForm, isPageActive);
    setPinPosition(movePosition.y, movePosition.x);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    window.fillAddress(adsForm, isPageActive);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
