/**
 * Function that returns a set of equally spaced number of points
 * containing a representation of intensities of the spectra arguments x
 * and y.
 *
 * @param {object} points
 * @param {Array<number>} points.x - sorted increasing x values
 * @param {Array<number>} points.y
 * @param {object} [options]
 * @param {number} [options.from = x[0]] - starting point
 * @param {number} [options.to = x[x.length - 1]] - last point
 * @param {number} [options.numberOfPoints = 100] - number of points between from and to
 * @param {string} [options.algorithm = 'smooth'] - algorithm to interpolate. There are two options:
 * * 'slot': average the existing points between the slot that belongs to the current value.
 * * 'smooth': takes the integral of the range of the slot and divide by the step size between two points in the new array.
 * @return {{x: Array<number>, y: Array<number>}}
 */
export default function (points, options = {}) {
    let {x, y} = points;

    let {
        from = x[0],
        to = x[x.length - 1],
        numberOfPoints = 100,
        algorithm = 'smooth'
    } = options;

    if (x.length !== y.length) {
        throw new RangeError('the x and y vector does not have the same size');
    }

    checkNumber(from, 'from');
    checkNumber(to, 'to');

    const reverse = from > to;
    if (reverse) {
        [from, to] = [to, from];
    }

    checkNumber(numberOfPoints, 'numberOfPoints');
    if (numberOfPoints < 1) {
        throw new RangeError('the number of points must be at least 1');
    }

    var output;
    switch (algorithm) {
        case 'slot':
            output = getEquallySpacedSlot(x, y, from, to, numberOfPoints);
            break;
        case 'smooth':
            output = getEquallySpacedSmooth(x, y, from, to, numberOfPoints);
            break;
        default:
            throw new TypeError(`unsupported algorithm "${algorithm}"`);
    }

    if (reverse) {
        return {x, y: output.reverse()};
    } else {
        return {x, y: output};
    }
}

function checkNumber(number, name) {
    if (typeof number !== 'number' || isNaN(number)) {
        throw new TypeError(`"${name}" option must be a number`);
    }
}

/**
 * function that retrieves the getEquallySpacedData with the algorithm "smooth"
 * @ignore
 * @param {Array<number>} x
 * @param {Array<number>} y
 * @param {number} from - Initial point
 * @param {number} to - Final point
 * @param {number} numberOfPoints
 * @return {Array<number>} - Array of y's equally spaced with the algorithm "smooth"
 */
function getEquallySpacedSmooth(x, y, from, to, numberOfPoints) {
    var step = (to - from) / (numberOfPoints - 1);
    var halfStep = step / 2;

    var start = from - halfStep;
    var output = new Array(numberOfPoints);

    var initialOriginalStep = x[1] - x[0];
    var lastOriginalStep = x[x.length - 1] - x[x.length - 2];

    // Init main variables
    var min = start;
    var max = start + step;

    var previousX = -Number.MAX_VALUE;
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

    main: while (true) {
        while (nextX - max >= 0) {
            // no overlap with original point, just consume current value
            var add = integral(0, max - previousX, slope, previousY);
            sumAtMax = currentValue + add;

            output[j] = (sumAtMax - sumAtMin) / step;
            j++;

            if (j === numberOfPoints) {
                break main;
            }

            min = max;
            max += step;
            sumAtMin = sumAtMax;
        }

        if (previousX <= min && min <= nextX) {
            add = integral(0, min - previousX, slope, previousY);
            sumAtMin = currentValue + add;
        }

        currentValue += integral(previousX, nextX, slope, intercept);

        previousX = nextX;
        previousY = nextY;

        if (i < x.length) {
            nextX = x[i];
            nextY = y[i];
            i++;
        } else if (i === x.length) {
            nextX += lastOriginalStep;
            nextY = 0;
        }
        // updating parameters
        slope = getSlope(previousX, previousY, nextX, nextY);
        intercept = -slope * previousX + previousY;
    }

    return output;
}

/**
 * function that retrieves the getEquallySpacedData with the algorithm "slot"
 * @ignore
 * @param {Array<number>} x
 * @param {Array<number>} y
 * @param {number} from - Initial point
 * @param {number} to - Final point
 * @param {number} numberOfPoints
 * @return {Array<number>} - Array of y's equally spaced with the algorithm "slot"
 */
function getEquallySpacedSlot(x, y, from, to, numberOfPoints) {
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
        if (previousX >= nextX) {
            throw new Error('x must be an increasing serie');
        }
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

        if (i < x.length) {
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
/**
 * Function that calculates the integral of the line between two
 * x-coordinates, given the slope and intercept of the line.
 * @ignore
 * @param {number} x0
 * @param {number} x1
 * @param {number} slope
 * @param {number} intercept
 * @return {number} integral value.
 */
function integral(x0, x1, slope, intercept) {
    return (0.5 * slope * x1 * x1 + intercept * x1) - (0.5 * slope * x0 * x0 + intercept * x0);
}

function getSlope(x0, y0, x1, y1) {
    return (y1 - y0) / (x1 - x0);
}