'use strict';

(function () {
  var mapHeight = window.util.map.clientHeight;
  var ADS_TYPES = ['palace', 'flat', 'house', 'bungalo'];

  var generateObj = function (index) {
    var obj = {
      author: {
        avatar: 'img/avatars/user0' + index + '.png',
      },
      offer: {
        type: '' + ADS_TYPES[window.util.getRandomNum(0, ADS_TYPES.length)],
      },
      location: {
        x: window.util.getRandomNum(0, mapHeight),
        y: window.util.getRandomNum(window.util.pin.MIN, window.util.pin.MAX)
      }
    };

    return obj;
  };

  var generateData = function (quantity) {
    var data = [];
    for (var i = 1; i <= quantity; i++) {

      data.push(generateObj(i));
    }

    return data;
  };

  window.data = {
    generate: generateData
  };
})();
