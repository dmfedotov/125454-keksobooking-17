'use strict';

(function () {
  window.changePageState = function () {
    window.util.map.classList.remove('map--faded');
    window.address.form.classList.remove('ad-form--disabled');

    return true;
  };
})();
