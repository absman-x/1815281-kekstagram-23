import {renderPicturePreviews} from './picture.js';
import {debounce, getRandomInteger} from './utils.js';

const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
const RERENDER_DELAY = 500;
const RANDOM_PICTURES_COUNT = 10;
const filterSection = document.querySelector('.img-filters');
const defaultPicturesFilterButton = document.querySelector('#filter-default');
const randomPicturesFilterButton = document.querySelector('#filter-random');
const disscusedPicturesFilterButton = document.querySelector('#filter-discussed');
const filtersForm = filterSection.querySelector('.img-filters__form');
const filtersButtons = filtersForm.querySelectorAll('.img-filters__button');

filterSection.classList.remove('img-filters--inactive');

const removePictures = () => {
  const picturesRendered = document.querySelectorAll('.picture');
  picturesRendered.forEach((picture) => picture.remove());
};

const getRandomUniqueItems = (items, count) => {
  let allItems = items.slice();
  const uniqueItems = [];
  while (uniqueItems.length < count) {
    const randomIndex = getRandomInteger(0, allItems.length-1);
    uniqueItems.push(allItems[randomIndex]);
    allItems = allItems.slice(0, randomIndex).concat(allItems.slice((randomIndex+1), allItems.length));
  }
  return uniqueItems;
};

const clearFilter = () => {
  removePictures();
  for (const button of filtersButtons) {
    button.classList.remove('img-filters__button--active');
  }
};

const picturesFilterHandler = (pictures) => {
  renderPicturePreviews(pictures);
  const discussedPictures = pictures.slice(0);
  discussedPictures.sort((element1, element2) => element2.comments.length - element1.comments.length);

  const defaultPicturesFilter = () => {
    clearFilter();
    defaultPicturesFilterButton.classList.add('img-filters__button--active');
    renderPicturePreviews(pictures);
  };

  const randomPicturesFilter = () => {
    clearFilter();
    renderPicturePreviews(getRandomUniqueItems(pictures, RANDOM_PICTURES_COUNT));
    randomPicturesFilterButton.classList.add('img-filters__button--active');
  };

  const disscusedPicturesFilter = () => {
    clearFilter();
    renderPicturePreviews(discussedPictures);
    disscusedPicturesFilterButton.classList.add('img-filters__button--active');
  };

  filterSection.addEventListener('click', debounce((evt) => {
    const clickedFilter = evt.target.id;
    if (evt.target.matches('button[type="button"]')) {
      switch (clickedFilter) {
        case (FILTERS.DEFAULT):
          defaultPicturesFilter();
          break;
        case (FILTERS.RANDOM):
          randomPicturesFilter();
          break;
        case (FILTERS.DISCUSSED):
          disscusedPicturesFilter();
          break;
      }
    }
  }, RERENDER_DELAY));
};

export {picturesFilterHandler};
