const bcrypt = require('bcryptjs')
// mongodb connection requires MONGODB_URI, which we stored in .env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Todo = require('../todo') // import todo model
const User = require('../user')
const db = require('../../config/mongoose')
// define seed user info
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userID = user._id
      return Promise.all(Array.from(
        { length: 10 },
        (_, i) => Todo.create({ name: `name-${i}`, userID }) // 第一個參數不會用到所以用 _ 代替
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})