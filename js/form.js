'use strict';

(function () {
  var typeOfHouseToPrice = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };
  var mainElement = document.querySelector('main');
  var typeOfHouse = window.address.adsForm.querySelector('#type');
  var rooms = window.address.adsForm.querySelector('#room_number');
  var capacity = window.address.adsForm.querySelector('#capacity');
  var timeIn = window.address.adsForm.querySelector('#timein');
  var timeOut = window.address.adsForm.querySelector('#timeout');
  var adsPriceField = window.address.adsForm.querySelector('#price');

  var onTypeOfHouseClick = function () {
    adsPriceField.setAttribute('min', typeOfHouseToPrice[typeOfHouse.value]);
    adsPriceField.placeholder = typeOfHouseToPrice[typeOfHouse.value];
  };

  onTypeOfHouseClick();
  typeOfHouse.addEventListener('change', onTypeOfHouseClick);

  var onCapacityClick = function (evt) {
    var target = evt.target;
    var targetValue = parseInt(target.value, 10);
    var roomsValue = parseInt(rooms.value, 10);

    if (roomsValue === 100 && targetValue !== 0) {
      target.setCustomValidity('Вам подходит только вариант \'не для гостей\'');
    } else if (targetValue === 0 && roomsValue !== 100) {
      target.setCustomValidity('Пожалуйста, укажите количество гостей');
    } else if (targetValue > roomsValue) {
      target.setCustomValidity('Количество мест не должно превышать количество комнат :)');
    } else {
      target.setCustomValidity('');
      rooms.setCustomValidity('');
    }
  };

  var onRoomsClick = function (evt) {
    var target = evt.target;
    var targetValue = parseInt(target.value, 10);
    var capacityValue = parseInt(capacity.value, 10);

    if (targetValue === 100 && capacityValue !== 0) {
      target.setCustomValidity('Вам подходит только вариант \'не для гостей\'');
    } else if (targetValue !== 100 && capacityValue === 0) {
      target.setCustomValidity('Вам подходит только вариант \'100 комнат\'');
    } else {
      target.setCustomValidity('');
      capacity.setCustomValidity('');
    }
  };

  rooms.addEventListener('change', onRoomsClick);
  capacity.addEventListener('change', onCapacityClick);

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

  var resetForm = function () {
    window.address.adsForm.reset();
  };

  var renderSuccess = function () {
    var template = document.querySelector('#success').content.querySelector('.success');
    var successElem = template.cloneNode(true);
    mainElement.appendChild(successElem);
  };

  var closeSuccess = function () {
    var successElem = mainElement.querySelector('.success');
    mainElement.removeChild(successElem);

    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', closeSuccess);
  };

  var onEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeSuccess();
    }
  };

  var onSuccess = function () {
    resetForm();
    window.changePageState(false);
    window.map.setDefaultPinPosition();
    window.pins.delete();
    window.preview.delete();
    window.address.setDefault();
    renderSuccess();

    document.addEventListener('keydown', onEscPress);
    document.querySelector('.success').addEventListener('click', closeSuccess);
  };

  window.address.adsForm.addEventListener('invalid', highlightInvalidField, true);
  window.address.adsForm.addEventListener('input', highlightInvalidField, true);
  window.address.adsForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(window.address.adsForm), onSuccess, window.error.show);
    evt.preventDefault();
  });
})();
