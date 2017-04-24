import findCombination from '../findCombination';

describe('findComboTests', function () {
  it('should find combinations', function () {
    for (let i = 2; i < 100; i++) { // eslint-disable-line
      const time = process.hrtime();
      findCombination(i);
      const [s, ns] = process.hrtime(time);
      const timeInMillis = (s * 1000) + (ns / 1e6);
      timeInMillis.should.be.lessThan(100);
    }
  });
});
