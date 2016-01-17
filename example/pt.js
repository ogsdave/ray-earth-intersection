var intersect = require('../')
var ecef = require('geodetic-to-ecef')
var sub = require('gl-vec3/subtract')
var normalize = require('gl-vec3/normalize')

var pt = ecef(64.50, -121.32, 5000)
var ground = ecef(64.38, -121.51, 0)
var ray = sub([], ground, pt)
var ipt = intersect([], pt, ray)
if (!ipt) return console.log('no intersection')

console.log('point:        [', pt.join(', '), ']')
console.log('ray:          [', ray.join(', '), ']')
console.log('intersection: [', ipt.join(', '), ']')
