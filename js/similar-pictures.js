import {renderPicturePreviews} from './picture.js';
import {getRandomInteger} from './utils.js';
import {debounce} from './utils/debounce.js';

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

const picturesRemover = () => {
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
  picturesRemover();
  for (const button of filtersButtons) {
    button.classList.remove('img-filters__button--active');
  }
};

const picturesFilterHandler = (pictures) => {
  renderPicturePreviews(pictures);
  const discussedPicture = pictures.slice(0);
  discussedPicture.sort((element1, element2) => element2.comments.length - element1.comments.length);

  const defaultPicturesFilter = debounce(() => {
    clearFilter();
    defaultPicturesFilterButton.classList.add('img-filters__button--active');
    renderPicturePreviews(pictures);
  }, RERENDER_DELAY);

  const randomPicturesFilter = debounce(() => {
    clearFilter();
    renderPicturePreviews(getRandomUniqueItems(pictures, RANDOM_PICTURES_COUNT));
    randomPicturesFilterButton.classList.add('img-filters__button--active');
  }, RERENDER_DELAY);

  const disscusedPicturesFilter = debounce(() => {
    clearFilter();
    renderPicturePreviews(discussedPicture);
    disscusedPicturesFilterButton.classList.add('img-filters__button--active');
  }, RERENDER_DELAY);

  filterSection.addEventListener('click', (evt) => {
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
  });
};

export {picturesFilterHandler};
