var wgs84 = require('wgs84')
var a = wgs84.RADIUS // semi-major axis
var b = wgs84.POLAR_RADIUS // semi-minor axis

module.exports = function (out, p, r) {
  var x = p[0], y = p[1], z = p[2]
  var u = r[0], v = r[1], w = r[2]
  // x(t) = (x+t*u), y(t) = (y+t*v), z(t) = (z+t*w)
  // 0 = pow(x(t)/a,2) + pow(y(t)/a,2) + pow(z(t)/b,2) - 1
  //   = pow((x+t*u)/a,2) + pow((y+t*v)/a,2) + pow((z+t*v)/b,2) - 1
  //   = (x*x+x*t*u+t*t*u*u)/(a*a)
  //     + (y*y+y*t*v+t*t*v*v)/(a*a)
  //     + (z*z+z*t*v+t*t*v*v)/(b*b) - 1
  //   = x*x/(a*a) + x*t*u/(a*a) + t*t*u*u/(a*a)
  //     + y*y/(a*a) + y*t*v/(a*a) + t*t*v*v/(a*a)
  //     + z*z/(b*b) + z*t*w/(b*b) + t*t*w*w/(b*b) - 1
  //   = t*t*((u*u+v*v)/(a*a) + w*w/(b*b))
  //     + t*((x*u+y*v)/(a*a)+z*w/(b*b))
  //     + (x*x+y*y)/(a*a) + z*z/(b*b) - 1

  var qa = (u*u+v*v)/(a*a) + w*w/(b*b)
  var qb = (x*u+y*v)/(a*a)+z*w/(b*b)
  var qc = (x*x+y*y)/(a*a) + z*z/(b*b) - 1
  var t0 = (-qb + Math.sqrt(qb*qb-4*qa*qc)) / (2*qa)
  var t1 = (-qb - Math.sqrt(qb*qb-4*qa*qc)) / (2*qa)
  var t
  if (t0 < 0 && t1 < 0) return null // no solution
  else if (t0 > 0 && t1 > 0) t = Math.min(t0, t1)
  else if (t0 > 0) t = t0
  else t = t1
  out[0] = x + t*u
  out[1] = y + t*v
  out[2] = z + t*w
  return out
}
