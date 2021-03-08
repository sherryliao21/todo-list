const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')


module.exports = app => {
  // initialize passport.js module
  app.use(passport.initialize())
  app.use(passport.session())
  // setting up local strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          req.flash('warning_msg', 'This email is not registered.')
          return done(null, false)
        }
        if (user.password !== password) {
          req.flash('warning_msg', 'Email or password is incorrect.')
          return done(null, false)
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))
  // serialize and deserialize session id & user data
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}