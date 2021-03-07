const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')


module.exports = app => {
  // initialize passport.js module
  app.use(passport.initialize())
  app.use(passport.session())
  // setting up local strategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'This email is not registered.' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Email or password is incorrect.' })
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