var intersect = require('../')
var ecef = require('geodetic-to-ecef')
var normalize = require('gl-vec3/normalize')

var pt = ecef(64.5, -121.5, 5000)
var ray = normalize([], ecef(64.1, -120.3, 0))
var ipt = intersect([], pt, ray)

console.log('point:        [', pt.join(', '), ']')
console.log('ray:          [', ray.join(', '), ']')
console.log('intersection: [', ipt.join(', '), ']')
