const getRandomInteger = function (a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


const createId = function () {
  let previousValues = 1;

  return function () {
    return previousValues++;
  };
};


const getRandomArrayElement = function (elements, count = 1) {
  let randomElements = '';

  for (let i = 0; i < count; i++) {
    randomElements += `${elements[ getRandomInteger(0, elements.length - 1) ]} `;
  }
  return randomElements.trimEnd();
};


export { getRandomInteger, createId, getRandomArrayElement };
