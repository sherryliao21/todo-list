const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!')
})
// show success msg once connected
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db