'use strict';

(function () {
  window.changePageState = function (status) {
    if (status) {
      window.pins.map.classList.remove('map--faded');
      window.address.adsForm.classList.remove('ad-form--disabled');

      window.changeFormState(window.address.adsForm, true);
      window.changeFormState(window.filters.form, true);
      window.backend.donwload(window.preview.onLoad, window.error.show);
    } else {
      window.pins.map.classList.add('map--faded');
      window.address.adsForm.classList.add('ad-form--disabled');

      window.changeFormState(window.address.adsForm, false);
      window.changeFormState(window.filters.form, false);
    }
  };
})();
