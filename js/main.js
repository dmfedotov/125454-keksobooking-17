var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var getRandomElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);

  return arr[index];
};

var getRandomNum = function (startIndex, endIndex) {
  return Math.round(Math.random() * (endIndex - startIndex) + startIndex;
};
