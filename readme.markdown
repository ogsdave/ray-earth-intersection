# ray-earth-intersection

find the intersection of an [ECEF point][1] in space with the wgs84 oblate
sphereoid that approximates the earth

[1]: https://en.wikipedia.org/wiki/ECEF

# example

``` js
var intersect = require('ray-earth-intersection')
var ecef = require('geodetic-to-ecef')

var pt = ecef(64.50, -121.32, 5000)
var ray = [-0.1,-0.5,-1]
var ipt = intersect([], pt, ray)
if (!ipt) return console.log('no intersection')

console.log('point:        [', pt.join(', '), ']')
console.log('intersection: [', ipt.join(', '), ']')
```

output:

```
point:        [ -1432372.0459134346, -2353986.7031978564, 5738444.021020929 ]
intersection: [ -1433090.557842638, -2357579.2628438743, 5731258.901728894 ]
```

# api

``` js
var intersect = require('ray-earth-intersection')
```

## var res = intersect(out, point, ray)

Compute the nearest intersection between `point`, an array `[x,y,z]` in ECEF
coordinates and the earth along `ray`, an array `[x,y,z]`.

`ray` does not need to be normalized in this implementation.

When there is no intersection, `res` will be `null`.

The result is written to the 3-element array vector `out` and returned as `res`.

# install

```
npm install ray-earth-intersection
```

# license

BSD
