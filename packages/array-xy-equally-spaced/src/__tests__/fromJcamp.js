import equallySpaced from '..';

describe('on jcamp data', function () {
  var data = require('./data/jcamp.json');
  var x = data.x;
  var y = data.y;

  it('inbound', function () {
    var ans = equallySpaced(x, y, {
      from: 100,
      to: 1500,
      numberOfPoints: 1000
    });
    ans.map((x) => x.should.not.be.NaN());
  });

  it('out of bounds start', function () {
    var ans = equallySpaced(x, y, {
      from: 0,
      to: 1500,
      numberOfPoints: 1000
    });
    ans.map((x) => x.should.not.be.NaN());
  });

  it('out of bounds end', function () {
    var ans = equallySpaced(x, y, {
      from: 1000,
      to: 4500,
      numberOfPoints: 1000
    });
    ans.map((x) => x.should.not.be.NaN());
  });

  it('completely out of bounds', function () {
    var ans = equallySpaced(x, y, {
      from: 3000,
      to: 4500,
      numberOfPoints: 1000
    });
    ans.map((x) => x.should.equal(0));
  });
  it('Array with negative numbers by smooth', () => {
    let data = require('./data/debug.json');
    let { x, y } = data;

    let j = 0;
    while (x[j] >= 0) j++;
    let index0 = j;
    while (x[j] >= 200) j++;
    let index200 = j;

    let ans = equallySpaced(x, y, {
      from: 0,
      to: 200,
      numberOfPoints: 7 * 1024,
      variant: 'smooth'
    });

    (y[index0] * 1.1 <= ans[0]).should.be.ok();
    (y[index200] * 1.1 <= ans[7 * 1024 - 1]).should.be.ok();
  });
});
