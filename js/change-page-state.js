'use strict';

(function () {
  window.changePageState = function () {
    window.filters.map.classList.remove('map--faded');
    window.address.adsForm.classList.remove('ad-form--disabled');

    window.changeFormState(window.address.adsForm, true);
    window.changeFormState(window.filters.form, true);
    window.backend.donwload(window.pins.onLoad, window.error.show);
  };
})();
