# array-xy-equally-spaced

  [![NPM version][npm-image]][npm-url]
  [![npm download][download-image]][download-url]

Get equally spaced points from a set of points using interpolation and extrapolation methods.

## Installation

`$ npm install --save array-xy-interpolation`

## Usage

```js
import equallySpaced from 'array-xy-equally-spaced';

const options = { 
   from: 0,
   to: 10,
   numberOfPoints: 5,
   algorithm: 'slot'
};
const result = equallySpaced({
    x: [0, 5, 10],
    y: [0, 5, 10]
}, options);

// result.y -> [0, 0, 5, 0, 10]
```

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/array-xy-equally-spaced.svg?style=flat-square
[npm-url]: https://npmjs.org/package/array-xy-equally-spaced
[download-image]: https://img.shields.io/npm/dm/array-xy-equally-spaced.svg?style=flat-square
[download-url]: https://npmjs.org/package/array-xy-equally-spaced
