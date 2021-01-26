const mongoose = require('mongoose')
// set schema module
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String, // data type is string
    required: true, // this data is required
  },
  isDone: {
    type: Boolean,
    default: false, // 預設狀態為false(預設todo是未完成的)
  }
})
// export module
// name the schema as 'Todo' 
module.exports = mongoose.model('Todo', todoSchema)