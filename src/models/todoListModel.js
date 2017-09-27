'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  title: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Tasks', TaskSchema)
