// Функция для проверки длины строки.

const isLengthValid = (text, maxLength) => text.length <= maxLength;

isLengthValid('проверяемая строка', 20); // true
isLengthValid('проверяемая строка', 18); // true
isLengthValid('проверяемая строка', 10); // false

//Функция для проверки, является ли строка палиндромом.

const isPalindrome = (text) => {
  const normalizedText = text.replaceAll(' ', '').toLowerCase();

  let reversedText = '';
  for (let i = normalizedText.length - 1; i >= 0; i--) {
    reversedText += normalizedText[i];
  }

  return normalizedText === reversedText;
};

/*
  const isPalindrome = (text) => {
  const normalizedText = text.replaceAll(' ', '').toLowerCase();
  const reversedText = normalizedText.split('').reverse().join('');
  return normalizedText === reversedText;
  };
*/

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

const getNumberFromString = (text) => {
  text = text.toString();

  let result = '';
  for (let i = 0; i < text.length; i++) {
    if (!Number.isNaN(parseInt(text[i], 10))) {
      result += text[i];
    }
  }

  return parseInt(result, 10);
};

getNumberFromString('2023 год'); // 2023
getNumberFromString('ECMAScript 2022'); // 2022
getNumberFromString('1 кефир, 0.5 батона'); // 105
getNumberFromString('агент 007'); // 7
getNumberFromString('а я томат'); // NaN
getNumberFromString(2023); // 2023
getNumberFromString(-1); // 1
getNumberFromString(1.5); // 15
