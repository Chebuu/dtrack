const User = require('../server/models/User')

exports.seedAdmin = () => {
  User.findOne({ username: 'admin' }, (err, doc) => {
    if(err){
      return User.create({
        username: 'admin',
        password: 'password',
        email: 'admin@dtrack.com',
      })
    }else{
      return doc
    }
  })
}