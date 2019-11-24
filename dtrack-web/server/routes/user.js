const express = require('express')
const passport = require('passport')

const profileController = require('../controllers/user.js').profileController

const router = express.Router()

router.route('/user')
  .get(passport.authenticate('jwt', { session: false }), function(req,res,next) { res.redirect('/#/user') })
  .post(passport.authenticate('jwt', { session: false }), function(req,res,next) { res.json({ message: 'NULL'}) })

router.route('/user/profile')
  .get(passport.authenticate('jwt', { session: false }), profileController)


module.exports = router