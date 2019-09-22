'use strict';

(function () {
  var FILE_TYPES = ['gif', 'png', 'jpeg', 'jpg'];
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';
  var avatarChooser = document.querySelector('#avatar');
  var avatarWrap = document.querySelector('.ad-form-header__preview');
  var avatarPreview = avatarWrap.querySelector('img');

  var deleteUploadedAvatar = function () {
    avatarPreview.src = DEFAULT_AVATAR_SRC;
    avatarChooser.value = '';
    avatarWrap.removeEventListener('mouseenter', onMouseEnter);
    avatarWrap.removeEventListener('mouseover', onMouseLeave);
  };

  var onMouseEnter = function () {
    avatarWrap.classList.add('ad-form-header__preview--delete');
    avatarWrap.addEventListener('click', onAvatarClick);
  };

  var onMouseLeave = function () {
    avatarWrap.classList.remove('ad-form-header__preview--delete');
    avatarWrap.removeEventListener('click', onAvatarClick);
  };

  var onAvatarClick = function () {
    deleteUploadedAvatar();
  };

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

        avatarWrap.addEventListener('mouseenter', onMouseEnter);
        avatarWrap.addEventListener('mouseleave', onMouseLeave);
      });

      reader.readAsDataURL(file);
    }
  });

  window.uploadAvatar = {
    delete: deleteUploadedAvatar
  };
})();
