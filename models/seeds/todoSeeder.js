const Todo = require('../todo') // import todo model
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  // create script for adding 10 new data
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('done adding')
})