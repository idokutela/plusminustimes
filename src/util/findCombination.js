import { plus, times, minus, inRange } from './operations';

function initArray(n, minItem = 1, maxItem = 9) {
  const diff = maxItem - minItem;
  const result = [];

  while (result.length < n) {
    result.push(minItem + inRange(diff));
  }
  return result;
}

const operations = [plus, minus, times];

const order = (i, j) => (i < j ? [i, j] : [j, i]);
export const removeTwoItemsAndOperate = (arr, i, j, operation) => {
  ([i, j] = order(i, j)); // eslint-disable-line
  return arr
    .slice(0, i)
    .concat(operation(arr[i], arr[j]))
    .concat(arr.slice(i + 1, j))
    .concat(arr.slice(j + 1));
};

const removeTwoRandomItemsAndOperate = (arr) => {
  const i = inRange(arr.length);
  let j = i;
  while (j === i) {
    j = inRange(arr.length);
  }
  const operation = operations[inRange(3)];

  return removeTwoItemsAndOperate(arr, i, j, operation);
};

const reduceToValue = (array) => {
  while (array.length > 1) {
    array = removeTwoRandomItemsAndOperate(array); // eslint-disable-line
  }
  return array[0];
};

export default function findCombination(n, max = 100) {
  let array;
  let result;
  do {
    array = initArray(n);
    result = reduceToValue(array);
  } while (result >= max);
  return { result, array };
}
