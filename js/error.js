'use strict';

(function () {
  var template = document.querySelector('#error').content.querySelector('.error');
  var mainElement = document.querySelector('main');

  var closeError = function () {
    var errorElem = mainElement.querySelector('.error');
    var errorButton = errorElem.querySelector('.error__button');
    mainElement.removeChild(errorElem);

    document.removeEventListener('keydown', onEscPress);
    errorButton.removeEventListener('click', closeError);
  };

  var renderError = function (message) {
    var errorElem = template.cloneNode(true);
    var fragment = document.createDocumentFragment();

    errorElem.querySelector('.error__message').textContent = message;
    fragment.appendChild(errorElem);
    mainElement.appendChild(fragment);
  };

  var onEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeError();
    }
  };

  var onError = function (errorMessage) {
    renderError(errorMessage);
    var errorButton = mainElement.querySelector('.error__button');

    document.addEventListener('keydown', onEscPress);
    errorButton.addEventListener('click', closeError);
  };

  window.error = {
    show: onError
  };
})();
