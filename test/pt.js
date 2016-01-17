var intersect = require('../')
var ecef = require('geodetic-to-ecef')
var test = require('tape')

test('point', function (t) {
  var pt = ecef(64.50, -121.32, 5000)
  var ray = [-0.1,-0.5,-1]
  var ipt = intersect([], pt, ray)
  t.deepEqual(ipt.map(round), [-1433091,-2357579,5731259])
  t.end()
})

function round (x) { return Math.round(x) }
