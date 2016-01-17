// http://gis.stackexchange.com/questions/20780/point-of-intersection-for-a-ray-and-earths-surface

var wgs84 = require('wgs84')
var a = wgs84.RADIUS // semi-major axis
var b = wgs84.POLAR_RADIUS // semi-minor axis

module.exports = function (out, point, ray) {
  // ipt = (x,y,z) + t*(u,v,w)
  // (x/a)^2 + (y/a)^2 + (z/b)^2 - 1 = 0
  var x = point[0], y = point[1], z = point[2]
  var u = ray[0], v = ray[1], w = ray[2]
  var qb = (b*b * (u*x + v*y) + a*a*w*z)
  var t = -(1/(b*b * (u*u + v*v) +  a*a*w*w))
    * (b*b * (u*x + v*y) + a*a*w*z
      + 1/2 * Math.sqrt(
       4*qb*qb - 4*(b*b*(u*u + v*v) + a*a*w*w)
        *(b*b*(-a*a + x*x + y*y) + a*a*z*z)
      )
    )
  out[0] = x + t*u
  out[1] = y + t*v
  out[2] = w + t*w
  return out
}
