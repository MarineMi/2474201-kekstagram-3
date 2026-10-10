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
    reversedText += normalizedText[ i ];
  }

  return normalizedText === reversedText;
};

/* const isPalindrome = (text) => {
  const normalizedText = text.replaceAll(' ', '').toLowerCase();
  const reversedText = normalizedText.split('').reverse().join('');
  return normalizedText === reversedText;
  }; */

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

const getNumberFromString = (text) => {
  if (typeof text === 'number') {
    text = text.toString();
  }

  let result = '';
  for (let i = 0; i < text.length; i++) {
    if (!Number.isNaN(parseInt(text[ i ], 10))) {
      result += text[ i ];
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


/*
Функция проверяет, что встреча не выходит за рамки рабочего дня
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/

const checkTime = (dayStart, dayEnd, meetingStart, meetingDuration) => {
  const timeToHours = function (time) {
    const [ hours, minutes ] = time.split(':').map((item) => parseInt(item, 10));
    return hours + minutes / 60;
  };

  const dayStartHours = timeToHours(dayStart);
  const dayEndHours = timeToHours(dayEnd);
  const meetingStartHours = timeToHours(meetingStart);
  const meetingEndHours = meetingStartHours + meetingDuration / 60;

  return dayStartHours <= meetingStartHours && meetingEndHours <= dayEndHours;
};

checkTime('08:00', '17:30', '14:00', 90); // true
checkTime('8:0', '10:0', '8:0', 120); // true
checkTime('08:00', '14:30', '14:00', 90); // false
checkTime('14:00', '17:30', '08:0', 90); // false
checkTime('8:00', '17:30', '08:00', 900); // false
