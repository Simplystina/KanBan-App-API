const express = require("express")
const TaskController = require("../Controllers/task")

const taskRouter = express.Router()

taskRouter.post('/create-task', TaskController.createTask)

taskRouter.get('/allboard-tasks/:id', TaskController.getAllBoardtasks)

taskRouter.get('/single-task/:id',TaskController.getAtask)

taskRouter.delete('/single-task/:id', TaskController.deleteBoard)

module.exports = taskRouter