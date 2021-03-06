
const config = require('../config/config')
const app = require('./express')

const signJWT = require('./api/passport/JWTStrategy.js').signJWT
const verifyJWT = require('./api/passport/JWTStrategy.js').verifyJWT

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

app.use('/*', function(req, res, next){
  req.signJWT = signJWT
  req.verifyJWT = verifyJWT
  next()
})

app.use(authRouter)
app.use(userRouter)

app.use('/*', function(err, req, res, next){
  console.error(err, '\n END')
  if(!res.headerSent)
    res.status(520).json({"error" : err.name + ": " + err.message})
})

app.listen(config.port, () => console.log(`Listening on port ${config.port}`))

