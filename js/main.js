'use strict';

var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OBJ_QUANTITY = 8;
var mapElem = document.querySelector('.map');

var getRandomElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);

  return arr[index];
};

var getRandomNum = function (startIndex, endIndex) {
  return Math.round(Math.random() * (endIndex - startIndex) + startIndex);
};

var generateObj = function (index) {
  var obj = {
    'author': {
      'avatar': 'img/avatars/user0' + index + '.png',
    },
    'offer': {
      'type': '' + getRandomElement(HOUSE_TYPES),
    },
    'location': {
      'x': getRandomNum(10, 700),
      'y': getRandomNum(130, 630)
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

var mock = generateMock(OBJ_QUANTITY);
mapElem.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinContainerElem = document.querySelector('.map__pins');

var renderPin = function (pin) {
  var pinElem = pinTemplate.cloneNode(true);

  pinElem.style = 'left: ' + pin.location.x + 'px; ' + 'top: ' + pin.location.y + 'px';
  pinElem.querySelector('img').src = pin.author.avatar;
  pinElem.querySelector('img').alt = pin.offer.type;

  return pinElem;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < mock.length; i++) {
  fragment.appendChild(renderPin(mock[i]));
}
pinContainerElem.appendChild(fragment);
