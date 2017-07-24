import equallySpaced from '..';
import {toBeDeepCloseTo} from 'jest-matcher-deep-close-to';
expect.extend({toBeDeepCloseTo});

var x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('equallySpaced smooth', () => {
    it('points in array', () => {
        var ans = equallySpaced({x, y}, {
            from: 1,
            to: 3,
            numberOfPoints: 3
        });

        expect(ans.y).toEqual([1, 2, 3]);
    });

    it('not exact values', () => {
        var ans = equallySpaced({x, y}, {
            from: 0.5,
            to: 2.5,
            numberOfPoints: 3
        });

        expect(ans.y).toBeDeepCloseTo([0.5, 1.5, 2.5], 3);
    });

    it('changing from and to', () => {
        var ans = equallySpaced({x, y}, {
            from: 6,
            to: 3,
            numberOfPoints: 4,
            algorithm: 'smooth'
        });

        expect(ans.y).toEqual([6, 5, 4, 3]);
    });
});

describe('equallySpaced slot', () => {
    it('points in array', () => {
        var ans = equallySpaced({x, y}, {
            from: 0,
            to: 10,
            numberOfPoints: 3,
            algorithm: 'slot'
        });

        expect(ans.y).toEqual([1, 5, 9]);
    });

    it('outside the range', () => {
        var ans = equallySpaced({x, y}, {
            from: -5,
            to: 15,
            numberOfPoints: 5,
            algorithm: 'slot'
        });

        expect(ans.y).toEqual([0, 1, 5, 9, 0]);
    });

    it('more points than input', () => {
        var ans = equallySpaced({
            x: [0, 5, 10],
            y: [0, 5, 10]
        }, {
            from: 0,
            to: 10,
            numberOfPoints: 5,
            algorithm: 'slot'
        });

        expect(ans.y).toEqual([0, 0, 5, 0, 10]);
    });

    it('less points than input', () => {
        var ans = equallySpaced({
            x: [0, 5, 10],
            y: [0, 5, 10]
        }, {
            from: 0,
            to: 10,
            numberOfPoints: 2,
            algorithm: 'slot'
        });

        expect(ans.y).toBeDeepCloseTo([2.5, 10], 3);
    });

    it('decreasing abscissa', () => {
        var ans = equallySpaced({x,
            y: [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0]
        }, {
            from: 4,
            to: 6,
            numberOfPoints: 3,
            algorithm: 'slot'
        });

        expect(ans.y).toEqual([4, 5, 4]);
    });
});
