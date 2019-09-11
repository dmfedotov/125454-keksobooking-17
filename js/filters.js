'use strict';

(function () {
  var form = window.pins.map.querySelector('.map__filters');
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
      if (window.pins.map.querySelector('.popup')) {
        window.preview.delete();
      }

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
    form: form,
    add: addFilters
  };
})();
