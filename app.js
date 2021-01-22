const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const db = mongoose.connection
const Todo = require('./models/todo')
// connect mongodb database, also fix deprecated methods
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
// get database connection status 

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
  Todo.find() // get all data from Todo model
    .lean() // turn Mongoose model into JavaScript data array
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`Express is listening on https://localhost:${port}`)
})