const express = require('express')
const router = express.Router()
const Users = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/users/login')
})

router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  Users.findOne({ email })
    .then(user => {
      if (user) {
        console.log('User already exists.')
        return res.render('register', {
          name, email, password, confirmPassword
        })
      } else {
        return Users.create({
          name, email, password
        })
          .then(() => res.redirect('/'))
          .catch(error => console.log(error))
      }
    })
})

module.exports = router

