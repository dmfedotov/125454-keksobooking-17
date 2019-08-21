var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var getRandomElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);

  return arr[index];
};
