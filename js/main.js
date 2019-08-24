'use strict';

var ADS_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADS_QUANTITY = 8;
var map = document.querySelector('.map');
// var mapPinsElem = document.querySelector('.map__pins');
var filtersForm = map.querySelector('.map__filters');
var adsForm = document.querySelector('.ad-form');
var mapPin = map.querySelector('.map__pin--main');
var mapHeight = map.clientHeight;

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
// mapPinsElem.appendChild(fragment);

var changeFormState = function (form, state) {
  var formElems = form.children;

  for (var j = 0; j < formElems.length; j++) {
    var element = formElems[j];
    element.disabled = state;
  }
};

changeFormState(filtersForm, true);
changeFormState(adsForm, true);

var changePageState = function () {
  map.classList.remove('map--faded');
  adsForm.classList.remove('ad-form--disabled');

  changeFormState(filtersForm, false);
  changeFormState(adsForm, false);
};

mapPin.addEventListener('click', changePageState);
