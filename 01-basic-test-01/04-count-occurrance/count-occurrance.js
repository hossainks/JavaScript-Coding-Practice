const countOccurrences = (str, char) => str.split(char).length - 1;

/* function countOccurrences(str, char) {
  let counter = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      counter++;
    }
    //  if (str[i].includes(char)) {
    //   counter++;
    // }
  }
  return counter;
} */

module.exports = countOccurrences;
