'use strict';

(function () {
  window.changeFormState = function (form, state) {
    Array.from(form.children).forEach(function (elem) {
      elem.disabled = !state;
    });
  };
})();
