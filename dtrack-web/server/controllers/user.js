const User = require('../models/User')

const profileController = (req, res, next) => {
  const userId = req.user._id
  User.findOne({ _id: userId }, '-password_hash').exec(function(err, user){
    if(err || !user) return res.status(500).json({ message: 'Internal Server error.' })
    Rating.find({ User: userId }, function(err, ratings){
      if(err) return res.status(500).json({ message: 'Internal Server error.' })
      Custom.find({ user: userId }, function(err, customs){
        if(err) return res.status(500).json({ message: 'Internal Server error.' })
        Result.find({ user: userId }, function(err, results){
          if(err) return res.status(500).json({ message: 'Internal Server error.' })
          console.log(results)
          res.status(302).json({ 
            message: 'Success.', 
            profile: user || []
          })
        })
      })
    })
  })
}



module.exports = {
  profileController: profileController
}
