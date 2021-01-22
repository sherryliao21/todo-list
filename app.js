const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

const mongoose = require('mongoose')
// connect mongodb database, also fix deprecated methods
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
// get database connection status 
const db = mongoose.connection
// show error msg if connection failed
db.on('error', () => {
  console.log('mongodb error!')
})
// show success msg once connected
db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Express is listening on https://localhost:${port}`)
})