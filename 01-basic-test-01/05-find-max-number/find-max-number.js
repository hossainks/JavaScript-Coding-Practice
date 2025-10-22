/* function findMaxNumber(number) {
  let max = number[0];
  for (let i = 0; i < number.length; i++) {
    if (max < number[i]) {
      max = number[i];
    }
  }
  return max;
} */

function findMaxNumber(number) {
  return Math.max(...number);
}

module.exports = findMaxNumber;
