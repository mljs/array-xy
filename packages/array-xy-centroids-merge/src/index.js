/**
 * Merge abscissa values if the ordinate value is in a list of centroids
 * @param {object} originalPoints
 * @param {Array<number>} originalPoints.x
 * @param {Array<number>} originalPoints.y
 * @param {Array<number>} centroids
 * @param {object} [options]
 * @param {number} [options.window = 0.01] - has to be a positive number
 * @return {{x: Array<number>, y: Array<number>}}
 */
export default function mergeByCentroids(originalPoints, centroids, options = {}) {
    const {
        window = 0.01
    } = options;

    var mergedPoints = {
        x: centroids.slice(),
        y: new Array(centroids.length).fill(0)
    };

    var originalIndex = 0;
    var mergedIndex = 0;
    while ((originalIndex < originalPoints.x.length) && (mergedIndex < centroids.length)) {
        var diff = originalPoints.x[originalIndex] - centroids[mergedIndex];
        if (Math.abs(diff) < window) {
            mergedPoints.y[mergedIndex] += originalPoints.y[originalIndex++];
        } else if (diff < 0) {
            originalIndex++;
        } else {
            mergedIndex++;
        }
    }

    return mergedPoints;
}
