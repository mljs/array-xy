import integrate from '..';

describe('integrate', function () {
  it('should yield the right result', function () {
    var x = [0, 1, 2, 3];
    var y = [1, 1, 1, 1];
    let result = integrate({ x, y });
    expect(result.integration).toBe(3);
  });
});
