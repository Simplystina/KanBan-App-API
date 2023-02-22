const BoardModel = require("../model/board")
const UserModel = require("../model/user")
const mongoose = require('mongoose');

exports.createBoard = async(req,res)=>{
    try {
        const data = req.body
       
        if(Object.keys(data).length === 0){
            console.log(data,"data")
            return  res.status(422).send({message: "Data entered is invalid"})
        }
        data.userId = req.user._id
        console.log(req.user, "userrrr")
        const board = await BoardModel.create(data)
        console.log(board, "board")
        return res.status(200).json({
            message: "Board created successfully",
            status: "true",
            data: board
        })
    } catch (error) {
        console.log(error)
        return res.status(404).send({
            message:"Title already used"
        })
       
    }
}

exports.getABoard = async(req,res)=>{
    
    try {
        const {id} = req.params
        console.log(id,"iddddd")
        const result = await BoardModel.findById(id)
        res.status(200).json({
            message:"Data fetched successfully",
            status: true,
            data: result
        }) 
    } catch (error) {
        res.status(404).send({message: "The id doesn't exist"})
    }
}

exports.getAllBoards = async(req,res)=>{
    try {

        const userId = req.user._id
        const email = req.user.email
        //const result = await BoardModel.find({"userId": userId})
        const result = await BoardModel.find({$or: [{ collaborators: email},{userId: userId }]})
        
        res.status(200).json({message:"Successfully retrieved", status: true, data: result})
    } catch (error) {
        res.status(404).send("Something went wrong, check logs")
    }
}
exports.getCollaboratedBoards = async(req,res)=>{
    try {

        const userId = req.user._id
        const email = req.user.email
        
        const result = await BoardModel.find({collaborators: email})
        
        res.status(200).json({message:"Collaborated Boards Successfully retrieved", status: true, data: result})
    } catch (error) {
        res.status(404).send("Something went wrong, check logs")
    }
}


exports.updateBoard = async(req,res)=>{
    try {
        const id = req.params.id
        const data = req.body
        const update = await BoardModel.findByIdAndUpdate(id, data, {new:true})
        res.status(200).json({message: "Board updated successfully", status: true, data:update})

    } catch (error) {
        res.status(404).send(error)
    }
}

exports.deleteBoard = async(req,res)=>{
    try {
        const id = req.params.id
        console.log(id,"idddddddddd")
        const fetchedData = await BoardModel.findById(id)

        console.log(req.user._id,  fetchedData)
        if(!fetchedData){
            return res.status(404).send({message:"ID doesn't exist"})
        }
       if(String(req.user._id) == String(fetchedData?.userId[0])){
            const data = await BoardModel.findByIdAndDelete(id)
           return res.status(200).json({message: "Board Deleted successfully", status: true})
       }
       return res.status(403).json({message: "You can't delete this board because you didn't create it", status: true})
    } catch (error) {
        console.log(error)
       return res.status(404).send({message:"ID doesn't exist"})
    }
}

exports.AddCollaborator = async(req,res)=>{
    try {
        const {email, boardId} = req.body
        console.log(email, boardId, req.user.email, "user details")
        const data = await UserModel.find({"email":email})
        
        if(email === req.user.email){
           return res.status(400).json({message:"You can't add yourself as a collaborator to your own project"})
        }
        console.log(data,"dataaaaaaa")
        if(data.length === 0){
          return res.status(404).json({message:"The email address supplied isn't registered", status: true})
        }
        //check if the email is already in the board
        const boardData = await BoardModel.find({_id : boardId, collaborators:email})
         if (boardData.length !== 0) {
            return res.status(404).json({message:`${email} is already a collaborator on this board`})
         }
         
        console.log(boardData,"check")

        const board = await BoardModel.updateOne(
            { _id: boardId },
            { $push: { collaborators: email } }
         )
        
        console.log(board)
        return res.status(201).json({message:`You have successfully added ${email} as a collaborator`})

    } catch (error) {
        console.log(error)
        res.status(404).send({message: "The id passed doesn't exist"})
    }
}