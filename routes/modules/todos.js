const express = require('express')
const todo = require('../../models/todo')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:id', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userID }) // you can only find the todo set by your account
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userID })
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const userID = req.user._id
  const name = req.body.name
  return Todo.create({ name, userID }) // isDone is false by default
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body
  return Todo.findOne({ _id, userID })
    .then(todo => {
      todo.name = name
      // if (todo.isDone === 'on') {
      //   todo.isDone = true
      // } else {
      //   todo.isDone = false
      // }
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userID })
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router