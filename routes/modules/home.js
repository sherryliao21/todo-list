const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  Todo.find() // get all data from Todo model
    .lean() // turn Mongoose model into JavaScript data array
    .sort({ _id: 'asc' }) // 正序是 asc 反序的話就是desc
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

module.exports = router

