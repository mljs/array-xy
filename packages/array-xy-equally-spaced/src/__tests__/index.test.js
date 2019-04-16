import equallySpaced from '..';

describe('equallySpaced', () => {
  it('equallySpaced smooth', function () {
    var x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var ans = equallySpaced(
      { x, y },
      {
        from: 1,
        to: 3,
        numberOfPoints: 3
      }
    );

    expect(ans).toEqual({
      x: [1, 2, 3],
      y: [1, 2, 3]
    });

    ans = equallySpaced(
      { x, y },
      {
        from: 0.5,
        to: 2.5,
        numberOfPoints: 3
      }
    );

    expect(ans).toEqual({
      x: [0.5, 1.5, 2.5],
      y: [0.5, 1.5, 2.5]
    });

    ans = equallySpaced(
      { x, y },
      {
        from: 9.5,
        to: 11.5,
        numberOfPoints: 3
      }
    );

    expect(ans).toEqual({
      x: [9.5, 10.5, 11.5],
      y: [9.5, 5, 0]
    });
  });

  it('equallySpaced slot', function () {
    var x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var ans = equallySpaced(
      { x, y },
      {
        from: 0,
        to: 10,
        numberOfPoints: 3,
        variant: 'slot'
      }
    );

    expect(ans).toEqual({
      x: [0, 5, 10],
      y: [1, 5, 9]
    });

    x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    ans = equallySpaced(
      { x, y },
      {
        from: -5,
        to: 15,
        numberOfPoints: 5,
        variant: 'slot'
      }
    );

    expect(ans).toEqual({
      x: [-5, 0, 5, 10, 15],
      y: [0, 1, 5, 9, 0]
    });

    x = [0, 5, 10];
    y = [0, 5, 10];

    ans = equallySpaced(
      { x, y },
      {
        from: 0,
        to: 10,
        numberOfPoints: 5,
        variant: 'slot'
      }
    );

    expect(ans).toEqual({
      x: [0, 2.5, 5, 7.5, 10],
      y: [0, 0, 5, 0, 10]
    });

    x = [0, 5, 10];
    y = [0, 5, 10];

    ans = equallySpaced(
      { x, y },
      {
        from: 0,
        to: 10,
        numberOfPoints: 2,
        variant: 'slot'
      }
    );

    expect(ans).toEqual({
      x: [0, 10],
      y: [2.5, 10]
    });

    x = [10, 5, 0];
    y = [10, 5, 0];
    ans = equallySpaced(
      { x, y },
      {
        from: 0,
        to: 10,
        numberOfPoints: 2,
        variant: 'slot'
      }
    );

    expect(ans).toEqual({
      x: [0, 10],
      y: [2.5, 10]
    });

    x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
    ans = equallySpaced(
      { x, y },
      {
        from: 4,
        to: 6,
        numberOfPoints: 3,
        variant: 'slot'
      }
    );

    expect(ans).toEqual({
      x: [4, 5, 6],
      y: [4, 5, 4]
    });
  });

  it('changing from and to', function () {
    var x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var ans = equallySpaced(
      { x, y },
      {
        from: 6,
        to: 3,
        numberOfPoints: 4,
        variant: 'smooth'
      }
    );

    expect(ans).toEqual({
      x: [6, 5, 4, 3],
      y: [6, 5, 4, 3]
    });
  });
});
