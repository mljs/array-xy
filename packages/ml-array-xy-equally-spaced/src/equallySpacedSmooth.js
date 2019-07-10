import integral from './integral';

/**
 * function that retrieves the getEquallySpacedData with the variant "smooth"
 *
 * @param {Array<number>} x
 * @param {Array<number>} y
 * @param {number} from - Initial point
 * @param {number} to - Final point
 * @param {number} numberOfPoints
 * @return {Array} - Array of y's equally spaced with the variant "smooth"
 */
export default function equallySpacedSmooth(x, y, from, to, numberOfPoints) {
  var xLength = x.length;

  var step = (to - from) / (numberOfPoints - 1);
  var halfStep = step / 2;

  var output = new Array(numberOfPoints);

  var initialOriginalStep = x[1] - x[0];
  var lastOriginalStep = x[xLength - 1] - x[xLength - 2];

  // Init main variables
  var min = from - halfStep;
  var max = from + halfStep;

  var previousX = Number.MIN_VALUE;
  var previousY = 0;
  var nextX = x[0] - initialOriginalStep;
  var nextY = 0;

  var currentValue = 0;
  var slope = 0;
  var intercept = 0;
  var sumAtMin = 0;
  var sumAtMax = 0;

  var i = 0; // index of input
  var j = 0; // index of output

  function getSlope(x0, y0, x1, y1) {
    return (y1 - y0) / (x1 - x0);
  }

  main: while (true) {
    if (previousX <= min && min <= nextX) {
      add = integral(0, min - previousX, slope, previousY);
      sumAtMin = currentValue + add;
    }

    while (nextX - max >= 0) {
      // no overlap with original point, just consume current value
      var add = integral(0, max - previousX, slope, previousY);
      sumAtMax = currentValue + add;

      output[j++] = (sumAtMax - sumAtMin) / step;

      if (j === numberOfPoints) {
        break main;
      }

      min = max;
      max += step;
      sumAtMin = sumAtMax;
    }

    currentValue += integral(previousX, nextX, slope, intercept);

    previousX = nextX;
    previousY = nextY;

    if (i < xLength) {
      nextX = x[i];
      nextY = y[i];
      i++;
    } else if (i === xLength) {
      nextX += lastOriginalStep;
      nextY = 0;
    }

    slope = getSlope(previousX, previousY, nextX, nextY);
    intercept = -slope * previousX + previousY;
  }

  return output;
}
