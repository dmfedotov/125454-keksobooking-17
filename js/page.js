'use strict';

(function () {
  var filtersForm = window.pins.map.querySelector('.map__filters');

  var changePageState = function () {
    window.pins.map.classList.remove('map--faded');
    window.address.adsForm.classList.remove('ad-form--disabled');

    window.changeFormState(window.address.adsForm, true);
    window.changeFormState(filtersForm, true);

    return true;
  };

  window.page = {
    filtersForm: filtersForm,
    changeState: changePageState
  };
})();
