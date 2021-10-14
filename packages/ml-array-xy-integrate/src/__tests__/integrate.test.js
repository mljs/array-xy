import integrate from '..';

describe('integrate', () => {
  it('should yield the right result', () => {
    let x = [0, 1, 2, 3];
    let y = [1, 1, 1, 1];
    let result = integrate({ x, y });
    expect(result.integration).toBe(3);
  });
});
