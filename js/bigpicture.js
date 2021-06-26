import {isEscEvent} from './utils.js';

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
const AVATAR_SIZE = 35;

const bigPictureToggle = () => {
  bigPicture.classList.toggle('hidden');
  bigPictureSocialCommentsCount.classList.toggle('hidden');
  bigPictureCommentsLoader.classList.toggle('hidden');
  body.classList.toggle('modal-open');
};

function closeBigPicturePopup() {
  removePopupListeners();
  bigPictureToggle();
}

const escEvent = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicturePopup();
  }
};

const removePopupListeners = () => {
  document.removeEventListener('keydown', escEvent);
  bigPictureCloseElement.removeEventListener('click', closeBigPicturePopup);
};

const commentElement = (element) => {
  const socialLiElement = document.createElement('li');
  const socialParagraphElement = document.createElement('p');
  const socialImgElement = document.createElement('img');
  socialLiElement.className = 'social__comment';
  socialImgElement.className = 'social__picture';
  socialImgElement.src = element.avatar;
  socialImgElement.alt = element.name;
  socialImgElement.width = AVATAR_SIZE;
  socialImgElement.height = AVATAR_SIZE;
  socialParagraphElement.className = 'social__text';
  socialParagraphElement.textContent = element.message;
  socialLiElement.appendChild(socialImgElement);
  socialLiElement.appendChild(socialParagraphElement);
  commentsBlock.appendChild(socialLiElement);
};

const bigPicturePreview = (picture) => {
  const comments = picture.comments;
  comments.forEach((element) => commentElement(element));
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

const BigPictureSelector = (picturesData) => {
  picturesList.addEventListener('click', (evt) => {
    picturesData.find((element) => {
      if (evt.target.matches('.picture__img')) {
        if (element.url === evt.target.attributes.src.textContent) {
          bigPicturePreview(element);
        }
      }
    });
  });
};

export {BigPictureSelector};
