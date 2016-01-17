var intersect = require('../')
var ecef = require('geodetic-to-ecef')

var pt = ecef(64.50, -121.32, 5000)
var ray = [-0.1,-0.5,-1]
var ipt = intersect([], pt, ray)
if (!ipt) return console.log('no intersection')

console.log('point:        [', pt.join(', '), ']')
console.log('intersection: [', ipt.join(', '), ']')
