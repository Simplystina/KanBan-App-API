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
//taskRouter.post('/add-subtask',TaskController.updateSubTask)


//Subtask
taskRouter.get('/complete-subtask/:id', TaskController.updateSubTaskToCompleted)
taskRouter.delete('/delete-subtask/:id', TaskController.deleteSubtask)
taskRouter.post('/add-subtask', TaskController.addSubtask)
taskRouter.get('/all-subtask/:id', TaskController.getAllSubtasks)


module.exports = taskRouter