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
    var photoElem = cardTemplate.querySelector('.popup__photo').cloneNode(true);
    photoElem.src = src;

    return photoElem;
  };

  var createFeature = function (className) {
    var featureElem = cardTemplate.querySelector('.popup__feature').cloneNode(true);
    featureElem.setAttribute('class', 'popup__feature popup__feature--' + className);

    return featureElem;
  };

  var renderFeatures = function (features) {
    var featuresFragment = document.createDocumentFragment();
    var featuresContainer = cardElem.querySelector('.popup__features');

    features.forEach(function (className) {
      var feature = createFeature(className);
      featuresFragment.appendChild(feature);
    });
    featuresContainer.innerHTML = '';
    featuresContainer.appendChild(featuresFragment);
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
    renderFeatures(card.offer.features);
    cardElem.querySelector('.popup__description').textContent = card.offer.description;
    renderPhotos(card.offer.photos);

    return cardElem;
  };

  var getAdsObject = function (evt) {
    var target = evt.target;
    var adsAvatarSrc = target.getAttribute('src');

    for (var i = 0; i < window.adsData.length; i++) {
      var adsObj = window.adsData[i];
      if (adsObj.author.avatar === adsAvatarSrc) {
        break;
      }
    }
    return adsObj;
  };

  var renderCard = function (pin) {
    var fragment = document.createDocumentFragment();

    var cardObj = getAdsObject(pin);
    fragment.appendChild(createCard(cardObj));
    window.pins.map.appendChild(fragment);

    var closeButton = window.pins.map.querySelector('.popup__close');
    closeButton.addEventListener('click', deleteCard);

    document.addEventListener('keydown', onEscPress);
  };

  var deleteCard = function () {
    var card = window.pins.map.querySelector('.popup');
    if (card) {
      window.pins.map.removeChild(card);
    }

    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      deleteCard();
    }
  };

  var onLoad = function (data) {
    window.pins.render(data);
    window.filters.add(data);
  };

  window.preview = {
    onLoad: onLoad,
    show: renderCard,
    delete: deleteCard
  };
})();
