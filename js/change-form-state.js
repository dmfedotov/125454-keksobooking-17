'use strict';

(function () {
  window.changeFormState = function (form, state) {
    var formElems = form.children;

    for (var i = 0; i < formElems.length; i++) {
      var element = formElems[i];
      element.disabled = !state;
    }
  };
})();