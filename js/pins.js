'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (pin) {
    var pinElem = pinTemplate.cloneNode(true);

    pinElem.style.left = pin.location.x - pinElem.clientWidth + 'px';
    pinElem.style.top = pin.location.y - pinElem.clientHeight + 'px';
    pinElem.querySelector('img').src = pin.author.avatar;
    pinElem.querySelector('img').alt = pin.offer.type;

    return pinElem;
  };

  var render = function name(data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(createPin(data[i]));
    }
    window.util.map.appendChild(fragment);
  };

  window.pins = {
    render: render
  };
})();
