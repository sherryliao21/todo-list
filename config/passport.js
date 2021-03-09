const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

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
          return done(null, false, { message: 'This email is not registered.' })
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              req.flash('warning_msg', 'Email or password is incorrect.')
              return done(null, false, { message: 'Email or password is incorrect.' })
            }
            return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }))
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    const { email, name } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user) // if user email is found in database, pass on the user info and proceed next step
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => {
            User.create({
              name,
              email,
              password: hash
            })
          })
          .then(done(null, user))
          .catch(err => done(err, false))
      })
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