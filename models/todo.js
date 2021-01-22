const mongoose = require('mongoose')
// set schema module
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String, // data type is string
    required: true // this data is required
  }
})
// export module
// name the schema as 'Todo' 
module.exports = mongoose.model('Todo', todoSchema)