const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false, // 預設狀態為false(預設todo是未完成的)
  }
})

module.exports = mongoose.model('Todo', todoSchema)