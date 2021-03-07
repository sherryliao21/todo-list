const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
require('./config/mongoose') // mongoose 連線設定只需要被執行，不須接到任何回傳參數再利用，所以不用設變數
const Todo = require('./models/todo')
const routes = require('./routes') // 預設會自動找到index.js檔案

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})