import {isEscEvent} from './utils.js';

const AVATAR_SIZE = 35;
const bigPicture = document.querySelector('.big-picture');
const body = document.body;
const picturesList = document.querySelector('.pictures');
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureSocialCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const commentsBlock = document.createDocumentFragment();

const bigPictureToggle = () => {
  bigPicture.classList.toggle('hidden');
  bigPictureSocialCommentsCount.classList.toggle('hidden');
  bigPictureCommentsLoader.classList.toggle('hidden');
  body.classList.toggle('modal-open');
};

const escEvent = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicturePopup();
  }
};

function closeBigPicturePopup() {
  document.removeEventListener('keydown', escEvent);
  bigPictureCloseElement.removeEventListener('click', closeBigPicturePopup);
  bigPictureToggle();
}

const renderComment = (comment) => {
  const socialLiElement = document.createElement('li');
  socialLiElement.className = 'social__comment';
  const socialParagraphElement = document.createElement('p');
  socialParagraphElement.className = 'social__text';
  socialParagraphElement.textContent = comment.message;
  const socialImgElement = document.createElement('img');
  socialImgElement.className = 'social__picture';
  socialImgElement.src = comment.avatar;
  socialImgElement.alt = comment.name;
  socialImgElement.width = AVATAR_SIZE;
  socialImgElement.height = AVATAR_SIZE;
  socialLiElement.appendChild(socialImgElement);
  socialLiElement.appendChild(socialParagraphElement);
  commentsBlock.appendChild(socialLiElement);
};

const renderBigPicturePreview = (picture) => {
  const comments = picture.comments;
  comments.forEach((comment) => renderComment(comment));
  bigPictureImg.querySelector('img').src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureCommentsCount.textContent = picture.comments.length;
  bigPictureDescription.textContent = picture.description;
  bigPictureComments.innerHTML = '';
  bigPictureComments.appendChild(commentsBlock);
  bigPictureToggle();
  document.addEventListener('keydown', escEvent);
  bigPictureCloseElement.addEventListener('click', closeBigPicturePopup);
};

const addOpenHandler = (picturesData) => {
  picturesList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      const id = parseInt(evt.target.dataset.id, 10);
      const pictureData = picturesData.find((it) => it.id === id);
      if (pictureData) {
        renderBigPicturePreview(pictureData);
      }
    }
  });
};

export {addOpenHandler};
