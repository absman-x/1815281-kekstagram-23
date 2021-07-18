import {checkEscEvent} from './utils.js';

const AVATAR_SIZE = 35;
const COMMENTS_COUNT = 5;
const bigPicture = document.querySelector('.big-picture');
const body = document.body;
const picturesList = document.querySelector('.pictures');
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureAllCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const commentsBlock = document.createDocumentFragment();

const bigPictureToggle = () => {
  bigPicture.classList.toggle('hidden');
  body.classList.toggle('modal-open');
};

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
  const escEventHandler = (evt) => {
    if (checkEscEvent(evt)) {
      evt.preventDefault();
      closeBigPicturePopupHandler();
    }
  };
  const comments = picture.comments.slice();
  const commentsLength = picture.comments.length;
  const renderCommentsBlockHandler = () => {
    const forRenderComments = comments.splice(0, COMMENTS_COUNT);
    forRenderComments.forEach((comment) => renderComment(comment));
    bigPictureComments.appendChild(commentsBlock);
    const shownCommentsCount = (bigPictureComments.querySelectorAll('.social__comment').length);
    bigPictureCommentsCount.innerHTML = `${shownCommentsCount} из <span class="comments-count">${commentsLength}</span> комментариев`;
    if (comments.length === 0) {
      bigPictureCommentsLoader.removeEventListener('click', renderCommentsBlockHandler);
      bigPictureCommentsLoader.classList.add('hidden');
    } else {
      bigPictureCommentsLoader.classList.remove('hidden');
    }
  };
  bigPictureComments.innerHTML = '';
  bigPictureImg.querySelector('img').src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureAllCommentsCount.textContent = commentsLength;
  bigPictureDescription.textContent = picture.description;
  bigPictureCommentsLoader.addEventListener('click', renderCommentsBlockHandler);
  bigPictureCommentsLoader.dispatchEvent(new Event('click'));
  bigPictureToggle();
  document.addEventListener('keydown', escEventHandler);
  bigPictureCloseElement.addEventListener('click', closeBigPicturePopupHandler);

  function closeBigPicturePopupHandler() {
    document.removeEventListener('keydown', escEventHandler);
    bigPictureCloseElement.removeEventListener('click', closeBigPicturePopupHandler);
    bigPictureCommentsLoader.removeEventListener('click', renderCommentsBlockHandler);
    commentsBlock.innerHTML = '';
    bigPictureCommentsCount.innerHTML = '';
    bigPictureComments.innerHTML = '';
    bigPictureImg.querySelector('img').src = '';
    bigPictureLikes.textContent = '';
    bigPictureAllCommentsCount.textContent = '';
    bigPictureDescription.textContent = '';
    bigPictureToggle();
  }
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
