require('dotenv').config()

const path = require('path')
const genuuid = require('uid-safe')
const randomstring = require('randomstring')

const root = path.resolve(__dirname, '../')

const PORT = process.env.PORT || 8000

const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const JWT_EXPIRES = process.env.JWT_EXPIRES || Date.now() + 43200000 // 12hr

const DB_URI = process.env.DB_URI || 'mongodb://localhost/dtrack'

const GATEWAY_DISCOVERY = process.env.GATEWAY_DISCOVERY || true
const AS_LOCAL_HOST = process.env.AS_LOCAL_HOST || true

module.exports = {
  root: root,
  port: PORT,
  static: {
    dir:'./dist/public',
    index: 'index.html',
    redirect: false,
    fallthrough: false
  },
  mongodb: {
    URI: DB_URI,
    connectionOpts: {
      useNewUrlParser: true, 
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  },
  passport: {
    jwt: {
      secretOrKey: JWT_SECRET,
      expires: JWT_EXPIRES
    },
    session: {
      init: function(mongoose, mongoStore){
        return({
          secret: randomstring.generate(),
          genid: function(req) {
            return genuuid(10) 
          },
          resave: false,
          saveUninitialized: true,
          cookie: {
            expires: JWT_EXPIRES
          },
          store: new mongoStore({
            mongooseConnection: mongoose.connection,
            collection: 'dtrack-sessions'
          })
        })
      }
    }
  },
  jwt: {
    opts:{
      expires: JWT_EXPIRES,
    },
    secret: JWT_SECRET
  },
  fabric: {
    local: {
      walletPath: path.normalize(process.cwd() + '/config/local_fabric/local_fabric_wallet'),
      connectionFile: path.normalize(process.cwd() + '/config/local_fabric/local_fabric_connection.json'),
      gatewayDiscovery: { enabled: GATEWAY_DISCOVERY, asLocalHost: AS_LOCAL_HOST }
    }
  }
}
