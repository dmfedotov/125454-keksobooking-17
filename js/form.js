'use strict';

(function () {
  var typeOfHouse = window.address.form.querySelector('#type');
  var timeIn = window.address.form.querySelector('#timein');
  var timeOut = window.address.form.querySelector('#timeout');
  var adsPriceField = window.address.form.querySelector('#price');

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

  window.address.form.addEventListener('invalid', highlightInvalidField, true);
  window.address.form.addEventListener('input', highlightInvalidField, true);
})();
