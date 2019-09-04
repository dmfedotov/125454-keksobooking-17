'use strict';

(function () {
  var map = document.querySelector('.map');
  var form = map.querySelector('.map__filters');
  var housingType = form.querySelector('#housing-type');

  var sortByType = function (pins) {
    if (housingType.value === 'any') {
      return pins;
    }

    return pins.filter(function (pin) {
      return pin.offer.type === housingType.value;
    });
  };

  var addFilters = function (data) {
    var changeFilters = function (evt) {
      switch (evt.target) {
        case housingType:
          window.pins.render(sortByType(data));
          break;
      }
    };

    form.addEventListener('change', function (evt) {
      var target = evt.target;
      if (target.tagName === 'SELECT') {
        changeFilters(evt);
      }
    });
  };


  window.filters = {
    map: map,
    form: form,
    add: addFilters
  };
})();
