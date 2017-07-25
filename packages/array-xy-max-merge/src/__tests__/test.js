import maxMerge from '..';
import {toBeDeepCloseTo} from 'jest-matcher-deep-close-to';
expect.extend({toBeDeepCloseTo});

const points = {
    x: [100.001, 100.002, 200.01, 200.02, 300.0001, 300.0002],
    y: [10, 11, 20, 21, 30, 31]
};
describe('test maxMerge', () => {
    it('default value', () => {
        const merged = maxMerge(points);
        expect(merged.x).toBeDeepCloseTo([100.002, 200.01, 200.02, 300.0002], 4);
        expect(merged.y).toEqual([21, 20, 21, 61]);
    });

    it('custom value', () => {
        const merged = maxMerge(points, {groupWidth: 0.010001});
        expect(merged.x).toBeDeepCloseTo([100.002, 200.02, 300.0002], 4);
        expect(merged.y).toEqual([21, 41, 61]);
    });
});
