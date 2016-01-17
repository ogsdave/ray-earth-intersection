var wgs84 = require('wgs84')
var a = wgs84.RADIUS // semi-major axis
var b = wgs84.POLAR_RADIUS // semi-minor axis

module.exports = function (out, p, r) {
  var x = p[0], y = p[1], z = p[2]
  var u = r[0], v = r[1], w = r[2]
  // x(t) = (x+t*u), y(t) = (y+t*v), z(t) = (z+t*w)
  // 0 = pow(x(t)/a,2) + pow(y(t)/a,2) + pow(z(t)/b,2) - 1
  //   = pow((x+t*u)/a,2) + pow((y+t*v)/a,2) + pow((z+t*v)/b,2) - 1
  //   = (x*x+2*x*t*u+t*t*u*u)/(a*a)
  //     + (y*y+2*y*t*v+t*t*v*v)/(a*a)
  //     + (z*z+2*z*t*v+t*t*v*v)/(b*b) - 1
  //   = x*x/(a*a) + 2*x*t*u/(a*a) + t*t*u*u/(a*a)
  //     + y*y/(a*a) + 2*y*t*v/(a*a) + t*t*v*v/(a*a)
  //     + z*z/(b*b) + 2*z*t*w/(b*b) + t*t*w*w/(b*b) - 1
  //   = t*t*((u*u+v*v)/(a*a) + w*w/(b*b))
  //     + t*2*((x*u+y*v)/(a*a)+z*w/(b*b))
  //     + (x*x+y*y)/(a*a) + z*z/(b*b) - 1

  var a2 = a*a, b2 = b*b
  var qa = (u*u+v*v)/a2 + w*w/b2
  var qb = 2*((x*u+y*v)/a2 + z*w/b2)
  var qc = (x*x+y*y)/a2 + z*z/b2 - 1
  var qsqi = qb*qb-4*qa*qc
  if (qsqi < 0) return null
  var qsq = Math.sqrt(qsqi)
  var t0 = (-qb + qsq) / (2*qa)
  var t1 = (-qb - qsq) / (2*qa)
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
