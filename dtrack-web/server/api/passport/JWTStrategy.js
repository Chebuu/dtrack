const jwt = require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('../../../config/config.js')
const User = require('../../models/User.js')

const opts = config.passport.jwt
// const secret = opts.secret
// const privateKey = opts.privateKey
// const publicKey = opts.publicKey

const cookieExtractor = function(req) {
  const cookies = req.cookies
  return cookies ? cookies.jwt : null 
}

const bodyExtractor = function(req) {
  const body = req.body || null
  return body ? body.jwt : null
}

opts.jwtFromRequest = ExtractJwt.fromExtractors([ 
  ExtractJwt.fromHeader('Authorization'), 
  ExtractJwt.fromBodyField('jwt'), 
  cookieExtractor 
])

exports.Strategy = 
  new JwtStrategy(
    opts,
    function(jwt_payload, done){
      if(!jwt_payload) return done(null, false)
      User.findOne({ _id: jwt_payload.id }, function(err, user) {
        if (err) {
          return done(err, false)
        }
        if (user) {
          if (Date.now() > jwt_payload.expires) {
            return done('JWT expired.', false)
          }
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
    }
  )

exports.signJWT = function(user, secret = config.jwt.secret, opts = config.jwt.opts){
  const payload = {
    id: user._id,
    expires: opts.expires
  }
  return new Promise(function(resolve, reject){
    jwt.sign(payload, secret, function(err, token) {
      if (err) {
        reject({ error: err, success: false, token: null })
      }else{
        resolve({ error: null, success: true, token: token })
      }
    })  
  })
}

exports.verifyJWT = function(user, secret = config.jwt.secret, opts = config.jwt.opts){
  const payload = {
    id: user._id,
    expires: opts.expires,
    verify: opts.verify
  }
  return new Promise(function(resolve, reject){
    jwt.verify(verify, function(err, dec){
      if(err) return reject(err)
      resolve(dec)
    })
  })
}



