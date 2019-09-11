'use strict';

(function () {
  var ADS_QUANTITY = 5;
  var map = document.querySelector('.map');
  var pinsContainer = map.querySelector('.map__pins');
  var mapPin = pinsContainer.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (pin) {
    var pinElem = pinTemplate.cloneNode(true);

    pinElem.style.left = pin.location.x - pinElem.clientWidth + 'px';
    pinElem.style.top = pin.location.y - pinElem.clientHeight + 'px';
    pinElem.querySelector('img').src = pin.author.avatar;
    pinElem.querySelector('img').alt = pin.offer.type;

    return pinElem;
  };

  var render = function (data) {
    pinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (pin) {
      pinsContainer.removeChild(pin);
    });
    window.adsData = data;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length && i < ADS_QUANTITY; i++) {
      var elem = data[i];
      fragment.appendChild(createPin(elem));
    }
    pinsContainer.appendChild(fragment);
  };

  window.pins = {
    map: map,
    render: render,
    container: pinsContainer,
    userPin: mapPin
  };
})();
