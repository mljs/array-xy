import equallySpaced from '..';

describe('closestX', () => {
  it('euqallySpaced smooth', function () {
    var x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var ans = equallySpaced({x, y}, {
      from: 1,
      to: 3,
      numberOfPoints: 3
    });

    expect(ans[0]).toBe(1);
    expect(ans[1]).toBe(2);
    expect(ans[2]).toBe(3);

    expect(ans = )equallySpaced({x, y}, {
      from: 0.5,
      to: 2.5,
      numberOfPoints: 3
    });

    expect(ans[0]).toBe(0.5);
    expect(ans[1]).toBe(1.5);
    expect(ans[2]).toBe(2.5);

    expect(ans = )equallySpaced({x, y}, {
      from: 9.5,
      to: 11.5,
      numberOfPoints: 3
    });

    expect(ans[0]).toBe(9.5);
    expect(ans[1]).toBe(5);
    expect(ans[2]).toBe(0);
  });

  it('euqallySpaced slot', function () {
    var x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var ans = equallySpaced({x, y}, {
      from: 0,
      to: 10,
      numberOfPoints: 3,
      variant: 'slot'
    });

    expect(ans[0]).toBe(1);
    expect(ans[1]).toBe(5);
    expect(ans[2]).toBe(9);

    var x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var ans = equallySpaced({x, y}, {
      from: -5,
      to: 15,
      numberOfPoints: 5,
      variant: 'slot'
    });

    expect(ans[0]).toBe(0);
    expect(ans[1]).toBe(1);
    expect(ans[2]).toBe(5);
    expect(ans[3]).toBe(9);
    expect(ans[4]).toBe(0);


    var x = [0, 5, 10];
    var y = [0, 5, 10];

    var ans = equallySpaced({x, y}, {
      from: 0,
      to: 10,
      numberOfPoints: 5,
      variant: 'slot'
    });

    expect(ans[0]).toBe(0);
    expect(ans[1]).toBe(0);
    expect(ans[2]).toBe(5);
    expect(ans[3]).toBe(0);
    expect(ans[4]).toBe(10);

    x = [0, 5, 10];
    y = [0, 5, 10];

    var ans = equallySpaced({x, y}, {
      from: 0,
      to: 10,
      numberOfPoints: 2,
      variant: 'slot'
    });

    expect(ans[0]).toBe(2.5);
    expect(ans[1]).toBe(10);

    x = [10, 5, 0];
    y = [10, 5, 0];
    var ans = equallySpaced({x, y}, {
      from: 0,
      to: 10,
      numberOfPoints: 2,
      variant: 'slot'
    });
    expect(ans[0]).toBe(2.5);
    expect(ans[1]).toBe(10);

    x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    y = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0];
    ans = euqallySpaced(x, y, {
      from: 4,
      to: 6,
      numberOfPoints: 3,
      variant: 'slot'
    });

    expect(ans[0]).toBe(4);
    expect(ans[1]).toBe(5);
    expect(ans[2]).toBe(4);
  });

  it('changing from and to', function () {
    var x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var ans = equallySpaced({x, y}, {
      from: 6,
      to: 3,
      numberOfPoints: 4,
      variant: 'smooth'
    });

    expect(ans[0]).toBe(6);
    expect(ans[1]).toBe(5);
    expect(ans[2]).toBe(4);
    expect(ans[3]).toBe(3);
  });
});
