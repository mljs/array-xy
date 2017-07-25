function sortX(points, options = {}) {
    const {x, y} = points;
    const {
        reverse = false
    } = options;

    var sortFunc;
    if (!reverse) {
        sortFunc = (a, b) => a.x - b.x;
    } else {
        sortFunc = (a, b) => b.x - a.x;
    }

    var grouped = x.map((val, index) => ({
        x: val,
        y: y[index]
    })).sort(sortFunc);

    var response = {x: x.slice(), y: y.slice()};
    for (var i = 0; i < x.length; i++) {
        response.x[i] = grouped[i].x;
        response.y[i] = grouped[i].y;
    }

    return response;
}

function kuhwick(points) {
    const {x, y} = points;
    if (points.x.length < 2) {
        return points;
    }

    const pivot = x[Math.round(x.length / 2) - 1];

    const less = {x: [], y: []};
    const more = {x: [], y: []};
    const same = {x: [], y: []};

    for (let i = 0, cmp; i < x.length; i++) {
        cmp = pivot - x[i];

        if (cmp > 0) {
            less.x.push(x[i]);
            less.y.push(y[i]);
        }

        if (cmp < 0) {
            more.x.push(x[i]);
            more.y.push(y[i]);
        }

        if (cmp === 0) {
            same.x.push(x[i]);
            same.y.push(y[i]);
        }
    }

    // is this tail call optimized?
    var left = kuhwick(less);
    var rigth = kuhwick(more);
    return {
        x: left.x.concat(same.x).concat(rigth.x),
        y: left.y.concat(same.y).concat(rigth.y)
    };
}

var input = {x: [], y: []};
var size = 10000000;
for (var i = 0; i < size; i++) {
    input.x.push(size - i);
    input.y.push(i);
}

console.log('size: ' + size);

console.time('sortX');
sortX(input);
console.timeEnd('sortX');
console.time('kuhwick');
kuhwick(input);
console.timeEnd('kuhwick');

