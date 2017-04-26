import findCombination, { removeTwoItemsAndOperate } from '../findCombination';
import findFirstStep, { operations } from '../findFirstStep';

describe('Find first step tests', function () {
  it('should find a valid first step', function () {
    const { result, array } = findCombination(3);
    let temp = array.slice();
    while (temp.length > 1) {
      const res = findFirstStep(temp, result);
      res.should.be.an.Array();
      const [i, j, k] = res;
      temp = removeTwoItemsAndOperate(temp, i, j, operations[k]);
    }
    result.should.equal(temp[0]);
  });

  it('should return false if there is no path to the result', function () {
    const array = [1, 3, 5];
    const result = 10000;
    const firstStep = findFirstStep(array, result);
    firstStep.should.be.false();
  });
});
