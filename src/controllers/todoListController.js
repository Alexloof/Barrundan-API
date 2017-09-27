'use strict'

const mongoose = require('mongoose')
const Tasks = mongoose.model('Tasks')

export const listAllTasks = (req, res) => {
  Tasks.find({}, (err, task) => {
    if (err) res.send(err)
    res.json(task)
  })
}

export const createTask = (req, res) => {
  const newTask = new Tasks(req.body)
  newTask.save((err, task) => {
    if (err) res.send(err)
    res.json(task)
  })
}
