'use strict';

(function () {
  var form = window.pins.map.querySelector('.map__filters');
  var housingType = form.querySelector('#housing-type');
  var housingPrice = form.querySelector('#housing-price');
  var housingRooms = form.querySelector('#housing-rooms');
  var housingGuests = form.querySelector('#housing-guests');
  var features = form.querySelectorAll('.map__checkbox');

  var sortByType = function (pins) {
    if (housingType.value === 'any') {
      return pins;
    }

    return pins.filter(function (pin) {
      return pin.offer.type === housingType.value;
    });
  };

  var sortByPrice = function (pins) {
    if (housingPrice.value === 'middle') {
      return pins.filter(function (pin) {
        return pin.offer.price >= 10000 && pin.offer.price <= 50000;
      });
    }

    if (housingPrice.value === 'low') {
      return pins.filter(function (pin) {
        return pin.offer.price <= 10000;
      });
    }

    if (housingPrice.value === 'high') {
      return pins.filter(function (pin) {
        return pin.offer.price >= 50000;
      });
    }

    return pins;
  };

  var sortByRooms = function (pins) {
    if (housingRooms.value === 'any') {
      return pins;
    }

    return pins.filter(function (pin) {
      return pin.offer.rooms === parseInt(housingRooms.value, 10);
    });
  };

  var sortByGuests = function (pins) {
    if (housingGuests.value === 'any') {
      return pins;
    }

    return pins.filter(function (pin) {
      return pin.offer.guests === parseInt(housingGuests.value, 10);
    });
  };

  var sortByFeatures = function (pins) {
    var checkedFeatures = Array.from(features).
      filter(function (feature) {
        return feature.checked === true;
      }).
      map(function (feature) {
        return feature.value;
      });

    if (checkedFeatures.length === 0) {
      return pins;
    }

    return pins.filter(function (pin) {
      return checkedFeatures.every(function (feature) {
        return pin.offer.features.includes(feature);
      });
    });
  };

  var sortData = function (data) {
    var filteredData = sortByType(data);
    filteredData = sortByPrice(filteredData);
    filteredData = sortByRooms(filteredData);
    filteredData = sortByGuests(filteredData);
    filteredData = sortByFeatures(filteredData);

    return filteredData;
  };

  var addFilters = function (data) {
    var changeFilters = function () {
      if (window.pins.map.querySelector('.popup')) {
        window.preview.delete();
      }

      window.pins.render(sortData(data));
    };

    var changeFiltersDebounced = window.util.debounce(changeFilters);
    form.addEventListener('change', function () {
      changeFiltersDebounced();
    });
  };


  window.filters = {
    form: form,
    add: addFilters
  };
})();
