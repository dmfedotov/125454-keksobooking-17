'use strict';

(function () {
  var typeOfHouseToPrice = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };
  var typeOfHouse = window.address.adsForm.querySelector('#type');
  var timeIn = window.address.adsForm.querySelector('#timein');
  var timeOut = window.address.adsForm.querySelector('#timeout');
  var adsPriceField = window.address.adsForm.querySelector('#price');

  var onTypeOfHouseClick = function () {
    adsPriceField.setAttribute('min', typeOfHouseToPrice[typeOfHouse.value]);
    adsPriceField.placeholder = typeOfHouseToPrice[typeOfHouse.value];
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

  window.address.adsForm.addEventListener('invalid', highlightInvalidField, true);
  window.address.adsForm.addEventListener('input', highlightInvalidField, true);
})();
