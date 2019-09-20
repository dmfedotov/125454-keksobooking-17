'use strict';

(function () {
  var FILE_TYPES = ['gif', 'png', 'jpeg', 'jpg'];
  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  avatarChooser.addEventListener('change', function name() {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var mathes = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (mathes) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });


      reader.readAsDataURL(file);
    }
  });
})();
