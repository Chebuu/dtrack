const express = require('express')
const passport = require('passport')

const fabricController = require('../controllers/user.js')

const router = express.Router()

router.route('/api/query')
  .get(passport.authenticate('jwt', { session: false }), fabricController.query.GET)
  .post(passport.authenticate('jwt', { session: false }), fabricController.query.POST)

router.route('/api/docs')
  .get(passport.authenticate('jwt', { session: false }), fabricController.docs.GET)
  .ppost(passport.authenticate('jwt', { session: false }), fabricController.docs.POST)

module.exports = router