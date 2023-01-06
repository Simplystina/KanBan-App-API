const express = require("express")
const TaskController = require("../Controllers/task")

const taskRouter = express.Router()

taskRouter.post('/create-task', TaskController.createTask)

taskRouter.get('/allboard-tasks/:id', TaskController.getAllBoardtasks)

taskRouter.get('/single-task/:id',TaskController.getAtask)

taskRouter.delete('/delete/:id', TaskController.deleteTask)
taskRouter.patch('/update/:id',TaskController.updateTask)

taskRouter.get('/done/:id', TaskController.getDonetasks)
taskRouter.get('/doing/:id', TaskController.getDoingtasks)
taskRouter.get('/todo/:id', TaskController.getTodotasks)
taskRouter.post('/add-subtask',TaskController.updateSubTask)

module.exports = taskRouter