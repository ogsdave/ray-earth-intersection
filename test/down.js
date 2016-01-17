var intersect = require('../')
var ecef = require('geodetic-to-ecef')
var sub = require('gl-vec3/subtract')
var dist = require('gl-vec3/distance')
var test = require('tape')

test('straight down', function (t) {
  var pt = ecef(64.50, -121.32, 5000)
  var ground = ecef(64.50, -121.32, 0)
  var ray = sub([], ground, pt)
  var ipt = intersect([], pt, ray)
  t.equal(Math.round(dist(pt, ipt)), 5000)
  t.equal(Math.round(dist(ground, ipt)), 0)
  t.end()
})

