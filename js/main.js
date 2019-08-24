'use strict';

var ADS_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADS_QUANTITY = 8;
var mapElem = document.querySelector('.map');
var mapPinsElem = document.querySelector('.map__pins');
var mapHeight = mapElem.clientHeight;

var getRandomNum = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var generateObj = function (index) {
  var obj = {
    author: {
      avatar: 'img/avatars/user0' + index + '.png',
    },
    offer: {
      type: '' + ADS_TYPES[getRandomNum(0, ADS_TYPES.length)],
    },
    location: {
      x: getRandomNum(0, mapHeight),
      y: getRandomNum(130, 630)
    }
  };

  return obj;
};

var generateMock = function (quantity) {
  var mock = [];
  for (var i = 1; i <= quantity; i++) {

    mock.push(generateObj(i));
  }

  return mock;
};

var mock = generateMock(ADS_QUANTITY);
mapElem.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElem = pinTemplate.cloneNode(true);

  pinElem.style.left = pin.location.x - pinElem.clientWidth + 'px';
  pinElem.style.top = pin.location.y - pinElem.clientHeight + 'px';
  pinElem.querySelector('img').src = pin.author.avatar;
  pinElem.querySelector('img').alt = pin.offer.type;

  return pinElem;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < mock.length; i++) {
  fragment.appendChild(renderPin(mock[i]));
}
mapPinsElem.appendChild(fragment);
