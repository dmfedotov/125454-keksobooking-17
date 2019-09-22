'use strict';

(function () {
  var FILE_TYPES = ['gif', 'png', 'jpeg', 'jpg'];
  var PhotoSize = {
    WIDTH: 70,
    HEIGHT: 70
  };
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoChooser = photoContainer.querySelector('#images');
  var photoWrap = photoContainer.querySelector('.ad-form__photo');

  var deleteEmptyPhotos = function () {
    if (!photoContainer.querySelector('.ad-form__photo img')) {
      photoContainer.querySelectorAll('.ad-form__photo').forEach(function (preview) {
        photoContainer.removeChild(preview);
      });
    }
  };

  var createEpmtyPhoto = function () {
    var emptyPhoto = document.createElement('div');
    emptyPhoto.classList.add('ad-form__photo');

    return emptyPhoto;
  };

  var onPhotoClick = function (evt) {
    var photo = evt.currentTarget;
    photoContainer.removeChild(photo);
    photoChooser.value = '';

    if (photoContainer.querySelectorAll('.ad-form__photo').length === 0) {
      photoContainer.appendChild(createEpmtyPhoto());
    }
  };

  var onMouseEnter = function (evt) {
    var target = evt.target;
    target.classList.add('ad-form__photo--delete');

    target.addEventListener('click', onPhotoClick);
  };

  var onMouseLeave = function (evt) {
    var target = evt.target;
    target.classList.remove('ad-form__photo--delete');

    photoWrap.removeEventListener('mouseenter', onMouseEnter);
    photoWrap.removeEventListener('mouseover', onMouseLeave);
  };

  var createPhoto = function (src) {
    var wrapper = photoWrap.cloneNode();
    var image = new Image(PhotoSize.WIDTH, PhotoSize.HEIGHT);
    image.src = src;
    image.alt = 'Фотография жилья';
    image.style.borderRadius = '5px';


    wrapper.appendChild(image);
    wrapper.addEventListener('mouseenter', onMouseEnter);
    wrapper.addEventListener('mouseleave', onMouseLeave);

    return wrapper;
  };

  var showUploadedPhotos = function (files) {
    deleteEmptyPhotos();
    files.forEach(function (file) {
      var fileName = file.name.toLowerCase();
      var mathes = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (mathes) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var photo = createPhoto(reader.result);
          photoContainer.appendChild(photo);
        });

        reader.readAsDataURL(file);
      }
    });
  };

  photoChooser.addEventListener('change', function () {
    var files = Array.from(photoChooser.files);
    showUploadedPhotos(files);
  });
})();
