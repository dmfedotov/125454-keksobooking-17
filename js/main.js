'use strict';

var ADS_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADS_QUANTITY = 8;
var PIN_COORD_MIN = 130;
var PIN_COORD_MAX = 630;
var map = document.querySelector('.map');
var mapPin = map.querySelector('.map__pin--main');
var mapHeight = map.clientHeight;
var filtersForm = map.querySelector('.map__filters');
var adsForm = document.querySelector('.ad-form');
var typeOfHouse = adsForm.querySelector('#type');
var timeIn = adsForm.querySelector('#timein');
var timeOut = adsForm.querySelector('#timeout');
var adsPriceField = adsForm.querySelector('#price');

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
      y: getRandomNum(PIN_COORD_MIN, PIN_COORD_MAX)
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

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createPin = function (pin) {
  var pinElem = pinTemplate.cloneNode(true);

  pinElem.style.left = pin.location.x - pinElem.clientWidth + 'px';
  pinElem.style.top = pin.location.y - pinElem.clientHeight + 'px';
  pinElem.querySelector('img').src = pin.author.avatar;
  pinElem.querySelector('img').alt = pin.offer.type;

  return pinElem;
};

var mock = generateMock(ADS_QUANTITY);

var render = function name(data) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(createPin(data[i]));
  }
  map.appendChild(fragment);
};

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

var fillAddressField = function (pin) {
  var addressField = adsForm.querySelector('#address');
  var coordX = Math.round(parseInt(pin.style.left, 10));
  var coordY = Math.round(parseInt(pin.style.top, 10));

  addressField.value = coordX + ', ' + coordY;
};

fillAddressField(mapPin);

mapPin.addEventListener('mouseup', function () {
  changePageState();
  fillAddressField(mapPin);
  render(mock);
});

var onTypeOfHouseClick = function () {
  var priceValue = '';

  switch (typeOfHouse.value) {
    case 'bungalo':
      priceValue = '0';
      break;
    case 'flat':
      priceValue = '1000';
      break;
    case 'house':
      priceValue = '5000';
      break;
    case 'palace':
      priceValue = '10000';
      break;
  }

  adsPriceField.setAttribute('min', priceValue);
  adsPriceField.placeholder = priceValue;
};

onTypeOfHouseClick();
typeOfHouse.addEventListener('change', onTypeOfHouseClick);

var onTimeClick = function (evt, field) {
  var target = evt.target;
  field.value = target.value;
};

timeIn.addEventListener('change', function (evt) {
  onTimeClick(evt, timeOut);
});

timeOut.addEventListener('change', function (evt) {
  onTimeClick(evt, timeIn);
});

var highlightInvalidField = function (evt) {
  var field = evt.target;

  if (!field.validity.valid) {
    field.style.outline = '2px solid red';
  } else {
    field.style = '';
  }
};

adsForm.addEventListener('invalid', highlightInvalidField, true);
adsForm.addEventListener('input', highlightInvalidField, true);
