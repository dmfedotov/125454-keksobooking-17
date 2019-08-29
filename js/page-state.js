'use strict';

(function () {
  var filtersForm = window.util.map.querySelector('.map__filters');

  var changePageState = function () {
    window.util.map.classList.remove('map--faded');
    window.address.form.classList.remove('ad-form--disabled');

    window.formState.change(filtersForm, false);
    window.formState.change(window.address.form, false);

    return true;
  };

  window.pageState = {
    change: changePageState
  };
})();
