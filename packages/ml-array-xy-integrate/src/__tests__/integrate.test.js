import integrate from '..';

describe('uniqueX', function () {
  it('should yield the right array 1', function () {
    var x = [0, 1, 2, 3];
    var y = [1, 1, 1, 1];
    integrate({ x, y });

    expect(x).toStrictEqual([0, 1, 2, 3]);
    expect(y).toStrictEqual([3, 3, 4, 11]);
  });
});