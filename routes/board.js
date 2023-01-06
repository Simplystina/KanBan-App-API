const express = require("express")

const BoardController = require("../Controllers/board")

const boardRouter = express.Router()

boardRouter.post('/create',BoardController.createBoard)
boardRouter.get('/all',BoardController.getAllBoards)
boardRouter.get('/:id',BoardController.getABoard)
boardRouter.delete('/:id',BoardController.deleteBoard)
boardRouter.put('/:id', BoardController.updateBoard)
boardRouter.post("/add-collaborator", BoardController.AddCollaborator)
module.exports = boardRouter