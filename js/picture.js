const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const picturesContainerFragment = document.createDocumentFragment();

const createPicturePreview = (picturePreview) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  const pictureLikes = picture.querySelector('.picture__likes');
  const pictureComments = picture.querySelector('.picture__comments');
  pictureImg.src = picturePreview.url;
  pictureImg.alt = picturePreview.description;
  pictureImg.dataset.id = picturePreview.id;
  pictureComments.textContent = picturePreview.comments.length;
  pictureLikes.textContent = picturePreview.likes;
  return picture;
};

const renderPicturePreviews = (picturePreviews) => {
  for (const picturePreview of picturePreviews) {
    picturesContainerFragment.appendChild(createPicturePreview(picturePreview));
  }
  picturesContainer.appendChild(picturesContainerFragment);
};

export {renderPicturePreviews};
