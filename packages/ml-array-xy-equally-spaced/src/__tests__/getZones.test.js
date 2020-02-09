import getZones from '../getZones';

describe('getZones', () => {
  it('no options', function() {
    let zones = getZones(0, 10, 11);
    expect(zones).toStrictEqual([
      {
        from: 0,
        to: 10,
        numberOfPoints: 11,
      },
    ]);
  });

  it('one exclusion', function() {
    let zones = getZones(0, 10, 11, [{ from: 2, to: 4 }]);
    expect(zones).toStrictEqual([
      {
        from: 0,
        to: 2,
        numberOfPoints: 3,
      },
      {
        from: 4,
        to: 10,
        numberOfPoints: 8,
      },
    ]);
  });

  it('two symmetric exclusion', function() {
    let zones = getZones(0, 10, 12, [
      { from: 2, to: 4 },
      { from: 6, to: 8 },
    ]);
    expect(zones).toStrictEqual([
      {
        from: 0,
        to: 2,
        numberOfPoints: 4,
      },
      {
        from: 4,
        to: 6,
        numberOfPoints: 4,
      },
      {
        from: 8,
        to: 10,
        numberOfPoints: 4,
      },
    ]);
  });

  it('two exclusion', function() {
    let zones = getZones(0, 12, 10, [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
    ]);
    expect(zones).toStrictEqual([
      {
        from: 0,
        to: 1,
        numberOfPoints: 1,
      },
      {
        from: 2,
        to: 3,
        numberOfPoints: 1,
      },
      {
        from: 4,
        to: 12,
        numberOfPoints: 8,
      },
    ]);
  });

  it('overlaping exclusionsn', function() {
    let zones = getZones(0, 10, 4, [
      { from: 2, to: 4 },
      { from: 2, to: 8 },
    ]);
    expect(zones).toStrictEqual([
      {
        from: 0,
        to: 2,
        numberOfPoints: 2,
      },
      {
        from: 8,
        to: 10,
        numberOfPoints: 2,
      },
    ]);
  });

  it('outside range exclusion', function() {
    let zones = getZones(0, 10, 4, [
      { from: -2, to: -4 },
      { from: 12, to: 14 },
    ]);
    expect(zones).toStrictEqual([
      {
        from: 0,
        to: 10,
        numberOfPoints: 4,
      },
    ]);
  });

  it('partial outside range exclusion', function() {
    let zones = getZones(0, 10, 4, [
      { from: -2, to: 2 },
      { from: 8, to: 12 },
    ]);
    expect(zones).toStrictEqual([
      {
        from: 2,
        to: 8,
        numberOfPoints: 4,
      },
    ]);
  });

  it('two exclusions with one outside range', function() {
    let zones = getZones(0, 3, 2, [
      { from: 1, to: 2 },
      { from: 4, to: 5 },
    ]);
    expect(zones).toStrictEqual([
      {
        from: 0,
        to: 1,
        numberOfPoints: 1,
      },
      {
        from: 2,
        to: 3,
        numberOfPoints: 1,
      },
    ]);
  });
});
