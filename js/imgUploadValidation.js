const HASH_TAG_LENGTH = { MIN: 2, MAX: 20 };
const HASH_TAG_PATTERN = new RegExp(`^#[a-zа-яё\\d]{${HASH_TAG_LENGTH.MIN - 1},${HASH_TAG_LENGTH.MAX - 1}}$`, 'i');
const HASH_TAG_COUNT = 5;
const DESCRIPTION_LENGTH = 140;

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFormHashtagsElement = uploadFormElement.querySelector('.text__hashtags');
const uploadFormDescriptionElement = uploadFormElement.querySelector('.text__description');


const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorClass: 'img-upload__field-wrapper--invalid', // Класс, обозначающий невалидное поле
  successClass: 'img-upload__field-wrapper--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextClass: 'img-upload-form__error' // Класс для элемента с текстом ошибки
});


const getHashtags = function (value) {
  return value.trim().split(/\s+/).filter(Boolean);
};


const isHashtagValid = function (value) {
  const hashtags = getHashtags(value);
  return hashtags.every((hashtag) => HASH_TAG_PATTERN.test(hashtag));
};


const isHashtagCountValid = function (value) {
  const hashtags = getHashtags(value);
  return hashtags.length <= HASH_TAG_COUNT;
};


const isHashtagUnique = function (value) {
  const hashtags = getHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return new Set(hashtags).size === hashtags.length;
};


const isDescriptionLengthValid = function (value) {
  return value.length <= DESCRIPTION_LENGTH;
};


pristine.addValidator(uploadFormHashtagsElement, isHashtagValid, `Хэш-тег должен начинаться с символа #, состоять только из букв и/или цифр, длина от ${HASH_TAG_LENGTH.MIN} до ${HASH_TAG_LENGTH.MAX} символов`);
pristine.addValidator(uploadFormHashtagsElement, isHashtagCountValid, `Можно указать не больше ${HASH_TAG_COUNT} хэш-тегов`);
pristine.addValidator(uploadFormHashtagsElement, isHashtagUnique, 'Один и тот же хэш-тег не может быть использован дважды');
pristine.addValidator(uploadFormDescriptionElement, isDescriptionLengthValid, `Максимальная длина ${DESCRIPTION_LENGTH} символов`);


const isValid = function () {
  return pristine.validate();
};


const resetValidation = function () {
  return pristine.reset();
};


export { isValid, resetValidation };
