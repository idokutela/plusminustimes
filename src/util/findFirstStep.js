/* eslint-disable no-plusplus */
import { PLUS, MINUS, TIMES } from '../state/constants';
import { removeTwoItemsAndOperate } from './findCombination';
import { plus, minus, times } from './operations';

export const operations = [];
operations[PLUS] = plus;
operations[MINUS] = minus;
operations[TIMES] = times;

/*
 * Finds a step towards a solution. Returns an array of the form
 * [firstIndex, secondIndex, operationIndex].
 * Returns false if none found.
 */
export default function findFirstStep(numbers = [], result) {
  if (numbers.length === 1) {
    return numbers[0] === result;
  }

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      for (let k = 0; k < operations.length; k++) {
        const found = findFirstStep(removeTwoItemsAndOperate(numbers, i, j, operations[k]), result);
        if (found) {
          return [i, j, k];
        }
      }
    }
  }

  return false;
}
