/**
 * function that retrieves the getEquallySpacedData with the variant "slot"
 *
 * @param {Array<number>} x
 * @param {Array<number>} y
 * @param {number} from - Initial point
 * @param {number} to - Final point
 * @param {number} numberOfPoints
 * @return {Array} - Array of y's equally spaced with the variant "slot"
 */
export default function equallySpacedSlot(x, y, from, to, numberOfPoints) {
  var xLength = x.length;

  var step = (to - from) / (numberOfPoints - 1);
  var halfStep = step / 2;
  var lastStep = x[x.length - 1] - x[x.length - 2];

  var start = from - halfStep;
  var output = new Array(numberOfPoints);

  // Init main variables
  var min = start;
  var max = start + step;

  var previousX = -Number.MAX_VALUE;
  var previousY = 0;
  var nextX = x[0];
  var nextY = y[0];
  var frontOutsideSpectra = 0;
  var backOutsideSpectra = true;

  var currentValue = 0;

  // for slot algorithm
  var currentPoints = 0;

  var i = 1; // index of input
  var j = 0; // index of output

  main: while (true) {
    if (previousX >= nextX) throw new Error('x must be an increasing serie');
    while (previousX - max > 0) {
      // no overlap with original point, just consume current value
      if (backOutsideSpectra) {
        currentPoints++;
        backOutsideSpectra = false;
      }

      output[j] = currentPoints <= 0 ? 0 : currentValue / currentPoints;
      j++;

      if (j === numberOfPoints) {
        break main;
      }

      min = max;
      max += step;
      currentValue = 0;
      currentPoints = 0;
    }

    if (previousX > min) {
      currentValue += previousY;
      currentPoints++;
    }

    if (previousX === -Number.MAX_VALUE || frontOutsideSpectra > 1) {
      currentPoints--;
    }

    previousX = nextX;
    previousY = nextY;

    if (i < xLength) {
      nextX = x[i];
      nextY = y[i];
      i++;
    } else {
      nextX += lastStep;
      nextY = 0;
      frontOutsideSpectra++;
    }
  }

  return output;
}
