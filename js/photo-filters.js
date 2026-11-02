import { renderGallery } from './photo-thumbnails-render.js';
import { debounce } from './utils.js';


const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;

let currentFilter = Filter.DEFAULT;
let photos = [];


const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = filtersElement.querySelector('.img-filters__form');
let buttonActiveElement = filtersFormElement.querySelector(`.${ACTIVE_BUTTON_CLASS}`);


const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;


const getFilteredPhotos = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [ ...photos ].sort(sortRandomly).slice(0, RANDOM_PHOTOS_COUNT);

    case Filter.DISCUSSED:
      return [ ...photos ].sort(sortByComments);

    default:
      return [ ...photos ];
  }
};


const rerenderGallery = debounce((filtered) => renderGallery(filtered), RERENDER_DELAY);


filtersFormElement.addEventListener('click', (evt) => {
  const buttonClickElement = evt.target.closest('.img-filters__button');

  if (!buttonClickElement || (buttonClickElement === buttonActiveElement)) {
    return;
  }

  buttonActiveElement.classList.remove(ACTIVE_BUTTON_CLASS);
  buttonClickElement.classList.add(ACTIVE_BUTTON_CLASS);
  buttonActiveElement = buttonClickElement;
  currentFilter = buttonClickElement.id;

  const filteredPhotos = getFilteredPhotos();
  rerenderGallery(filteredPhotos);
});


const initFilters = (loadedPhotos) => {
  filtersElement.classList.remove('img-filters--inactive');
  photos = loadedPhotos;
};


export { initFilters };
