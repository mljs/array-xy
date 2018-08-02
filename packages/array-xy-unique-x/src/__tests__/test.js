import uniqueX from '..';

describe('uniqueX', function () {
  it('should yield the right array 1', function () {
    var x = [0, 0, 1, 2, 3, 3];
    var y = [1, 2, 3, 4, 5, 6];
    uniqueX({ x, y });

    expect(x).toEqual([0, 1, 2, 3]);
    expect(y).toEqual([3, 3, 4, 11]);
  });

  it('should yield the right array 2', function () {
    var x = [0, 1, 2, 3];
    var y = [1, 2, 3, 4];
    uniqueX({ x, y });

    expect(x).toEqual([0, 1, 2, 3]);
    expect(y).toEqual([1, 2, 3, 4]);
  });

  it('should yield the right array 3', function () {
    var x = [0, 0, 0, 0];
    var y = [1, 2, 3, 4];
    uniqueX({ x, y });

    expect(x).toEqual([0]);
    expect(y).toEqual([10]);
  });
});
