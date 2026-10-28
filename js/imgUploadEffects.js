const EFFECTS = {
  chrome: {
    filter: 'grayscale',
    units: '',
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1
    }
  },
  sepia: {
    filter: 'sepia',
    units: '',
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1
    }
  },
  marvin: {
    filter: 'invert',
    units: '%',
    sliderOptions: {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 100,
    }
  },
  phobos: {
    filter: 'blur',
    units: 'px',
    sliderOptions: {
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
      start: 3,
    }
  },
  heat: {
    filter: 'brightness',
    units: '',
    sliderOptions: {
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3,
    }
  }
};


const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFormPreviewElement = uploadFormElement.querySelector('.img-upload__preview');
const effectLevelElement = uploadFormElement.querySelector('.img-upload__effect-level');
const effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');
const effectLevelSliderElement = effectLevelElement.querySelector('.effect-level__slider');
const effectsListElement = uploadFormElement.querySelector('.img-upload__effects');


let currentEffect;

const resetFilter = function () {
  effectLevelElement.classList.add('hidden');
  uploadFormPreviewElement.style.filter = '';
  effectLevelValueElement.value = '';
  currentEffect = null;
};

resetFilter();


noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});


effectLevelSliderElement.noUiSlider.on('update', () => {
  if (currentEffect) {
    const { filter, units } = currentEffect;
    const value = effectLevelSliderElement.noUiSlider.get();
    effectLevelValueElement.value = value;
    uploadFormPreviewElement.style.filter = `${filter}(${value}${units})`;
  }
});


effectsListElement.addEventListener('change', (evt) => {
  if (!evt.target.matches('input[name="effect"]')) {
    return;
  }

  if (evt.target.value !== 'none') {
    currentEffect = EFFECTS[ evt.target.value ];
    const { sliderOptions } = currentEffect;

    effectLevelSliderElement.noUiSlider.updateOptions(sliderOptions);
    effectLevelSliderElement.noUiSlider.set(sliderOptions.start);
    effectLevelElement.classList.remove('hidden');

  } else {
    resetFilter();
  }
});


export { resetFilter };
