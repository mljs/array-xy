/**
 * Filter an array x/y based on various criteria
 * x points are expected to be sorted
 *
 * @param {object} points
 * @param {object} [options={}]
 * @param {array} [options.from]
 * @param {array} [options.to]
 * @param {array} [options.exclusions=[]]
 * @return {{x: Array<number>, y: Array<number>}}
 */
export default function filterX(points, options = {}) {
  const { x, y } = points;
  const { from = x[0], to = x[x.length - 1], exclusions = [] } = options;

  exclusions.forEach((a) => {
    if (a.from > a.to) {
      [a.to, a.from] = [a.from, a.to];
    }
  });
  exclusions.sort((a, b) => a.from - b.from);

  let newX = [];
  let newY = [];
  let position = 0;
  let currentFrom = from;
  let currentTo;

  for (let exclusion of exclusions) {
    currentTo = exclusion.from;
    while (position < x.length) {
      if (x[position] >= currentTo) {
        currentFrom = exclusion.to;
        break;
      }
      if (x[position] >= currentFrom) {
        newX.push(x[position]);
        newY.push(y[position]);
      }
      position++;
    }
  }

  while (position < x.length) {
    if (x[position] <= to && x[position] >= currentFrom) {
      newX.push(x[position]);
      newY.push(y[position]);
    } else {
      if (x[position] > to) {
        break;
      }
    }
    position++;
  }

  return {
    x: newX,
    y: newY
  };
}
