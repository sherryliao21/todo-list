const express = require('express')
const router = express.Router()

const passport = require('passport')

// click the fb login button to direct to fb and ask for permission & data
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

// fb send data back to express server 
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router