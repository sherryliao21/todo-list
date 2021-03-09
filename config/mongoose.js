const mongoose = require('mongoose')
const db = mongoose.connection
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

db.on('error', () => {
  console.log('mongodb error!')
})
// show success msg once connected
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db