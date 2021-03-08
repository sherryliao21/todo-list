const express = require('express')
const router = express.Router()
const Users = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', 'You have logged out successfully.')
  res.redirect('/users/login')
})

router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  // check if input is in incorrect format
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'All fields are required.' })
  }
  if (name && email && password && confirmPassword) {
    if (password !== confirmPassword) {
      errors.push({ message: 'Password mismatched!' })
    }
  }
  if (errors.length) {
    return res.render('register', {
      errors, name, email, password, confirmPassword
    })
  }
  Users.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: 'This email has already been registered.' })
        return res.render('register', {
          errors, name, email, password, confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => Users.create({
          name, email, password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})

module.exports = router

