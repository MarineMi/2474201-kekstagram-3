const SCALE_COUNT = { MIN: 25, MAX: 100, STEP: 25 };
let currentScaleCount = SCALE_COUNT.MAX;

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFormPreviewElement = uploadFormElement.querySelector('.img-upload__preview');
const scaleSmallerElement = uploadFormElement.querySelector('.scale__control--smaller');
const scaleBiggerElement = uploadFormElement.querySelector('.scale__control--bigger');
const scaleValueElement = uploadFormElement.querySelector('.scale__control--value');


const changeScale = function () {
  scaleValueElement.value = `${currentScaleCount}%`;
  uploadFormPreviewElement.style.transform = `scale(${currentScaleCount / 100})`;
};


scaleSmallerElement.addEventListener('click', () => {
  if (currentScaleCount > SCALE_COUNT.MIN) {
    currentScaleCount -= SCALE_COUNT.STEP;
    changeScale();
  }
});


scaleBiggerElement.addEventListener('click', () => {
  if (currentScaleCount < SCALE_COUNT.MAX) {
    currentScaleCount += SCALE_COUNT.STEP;
    changeScale();
  }
});


const resetScale = function () {
  currentScaleCount = SCALE_COUNT.MAX;
  changeScale();
};


export { resetScale };
