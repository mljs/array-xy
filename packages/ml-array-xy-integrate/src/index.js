import closestX from 'ml-arrayxy-closestx';

/**
 * In place modification of the 2 arrays to make X unique and sum the Y if X has the same value
 * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [from] - First value for integration in the X scale
 * @param {number} [fromIndex=0] - First point for integration
 * @param {number} [to] - Last value for integration in the X scale
 * @param {number} [toIndex=x.length-1] - Last point for integration
 * @param {boolean} [integral=false] - Returns the integral as x,y chart
 * @return {object}
 */

export default function integrate(points = {}, options = {}) {
  const { x, y } = points;
  if (x.length < 2) return { integration: 0 };
  if (x.length !== y.length) {
    throw new Error('The X and Y arrays mush have the same length');
  }

  let { fromIndex, toIndex, from, to } = options;

  if (fromIndex === undefined) {
    if (from !== undefined) {
      fromIndex = closestX({ x, y }, { target: from });
    } else {
      fromIndex = 0;
    }
  }
  if (toIndex === undefined) {
    if (to !== undefined) {
      toIndex = closestX({ x, y }, { target: to });
    } else {
      toIndex = x.length - 1;
    }
  }

  let integration = 0;
  for (let i = fromIndex; i < toIndex; i++) {
    integration += ((x[i + 1] - x[i]) * (y[i + 1] + y[i])) / 2;
  }
  return { integration };
}
