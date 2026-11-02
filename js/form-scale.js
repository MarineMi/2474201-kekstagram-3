import { uploadFormElement, uploadFormPreviewImageElement } from './elements.js';


const SCALE_COUNT = { MIN: 25, MAX: 100, STEP: 25 };
let currentScaleCount = SCALE_COUNT.MAX;

const scaleSmallerElement = uploadFormElement.querySelector('.scale__control--smaller');
const scaleBiggerElement = uploadFormElement.querySelector('.scale__control--bigger');
const scaleValueElement = uploadFormElement.querySelector('.scale__control--value');


const changeScale = function (factor) {
  currentScaleCount = Math.min(Math.max(currentScaleCount + SCALE_COUNT.STEP * factor, SCALE_COUNT.MIN), SCALE_COUNT.MAX);
  scaleValueElement.value = `${currentScaleCount}%`;
  uploadFormPreviewImageElement.style.transform = `scale(${currentScaleCount / 100})`;
};


scaleSmallerElement.addEventListener('click', () => changeScale(-1));


scaleBiggerElement.addEventListener('click', () => changeScale(1));


const resetScale = function () {
  changeScale(1);
};


export { resetScale };
