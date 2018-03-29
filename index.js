const closestX = require('./packages/array-xy-closest-x');
const centroidsMerge = require('./packages/array-xy-centroids-merge');
const maxMerge = require('./packages/array-xy-max-merge');
const sortX = require('./packages/array-xy-sort-x');
const maxY = require('./packages/array-xy-max-y');
const weightedMerge = require('./packages/array-xy-weighted-merge');

module.exports = {
    centroidsMerge: centroidsMerge.default,
    closestX: closestX.default,
    maxMerge: maxMerge.default,
    maxY: maxY.default,
    sortX: sortX.default,
    weightedMerge: weightedMerge.default
};
