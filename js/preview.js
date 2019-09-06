'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var cardElem = cardTemplate.cloneNode(true);

  var determineType = function (card) {
    var type = '';

    switch (card.offer.type) {
      case 'flat':
        type = 'Квартира';
        break;
      case 'bungalo':
        type = 'Бунгало';
        break;
      case 'house':
        type = 'Дом';
        break;
      case 'palace':
        type = 'Дворец';
        break;
    }

    return type;
  };

  var createPhoto = function (src) {
    var photoElem = cardElem.querySelector('.popup__photo').cloneNode(true);
    photoElem.src = src;

    return photoElem;
  };

  var renderPhotos = function (sources) {
    var photosFragment = document.createDocumentFragment();
    var photosContainer = cardElem.querySelector('.popup__photos');

    sources.forEach(function (src) {
      var photo = createPhoto(src);
      photosFragment.appendChild(photo);
    });
    photosContainer.innerHTML = '';
    photosContainer.appendChild(photosFragment);
  };

  var createCard = function (card) {
    cardElem.querySelector('.popup__avatar').src = card.author.avatar;
    cardElem.querySelector('.popup__title').textContent = card.offer.title;
    cardElem.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElem.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElem.querySelector('.popup__type').textContent = determineType(card);
    cardElem.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' для ' + card.offer.guests + ' гостей';
    cardElem.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElem.querySelector('.popup__features').textContent = card.offer.features.join(', ');
    cardElem.querySelector('.popup__description').textContent = card.offer.description;

    renderPhotos(card.offer.photos);

    return cardElem;
  };

  var render = function (data) {
    var fragment = document.createDocumentFragment();

    var elem = data[0];
    fragment.appendChild(createCard(elem));
    window.pins.container.appendChild(fragment);
  };

  var onLoad = function (data) {
    window.pins.render(data);
    render(data);
    window.filters.add(data);
  };

  window.preview = {
    onLoad: onLoad
  };
})();
