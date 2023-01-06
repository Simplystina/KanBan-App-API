const BoardModel = require("../model/board")
const TaskModel = require("../model/task")

exports.createTask = async(req,res)=>{
    try {
        const data = req.body
       
        if(Object.keys(data).length === 0){
            console.log(data,"data")
            return  res.status(422).send({message: "Data entered is invalid"})
        }
        
        const task = await TaskModel.create(data)
        console.log(task, "task")
        return res.status(200).json({
            message: "task created successfully",
            status: "true",
            data: task
        })
    } catch (error) {
        console.log(error)
        return res.status(404).send({
            message:"Title already used"
        })
      
    }
}

exports.getAtask = async(req,res)=>{
    
    try {
        const {id} = req.params
        console.log(id,"iddddd")
        const result = await taskModel.findById(id)
        res.status(200).json({
            message:"Data fetched successfully",
            status: true,
            data: result
        })
    } catch (error) {
        res.status(500).send({message: "The id doesn't exist"})
    }
}

exports.getAllBoardtasks = async(req,res)=>{

    const  {id} = req.params

    const findQuery = {}
    //findQuery.boardId = boardId
    try {
        
        
        const result = await TaskModel.find({"boardId":id}).populate("author")
        
        res.status(200).json({message:"Successfully retrieved", status: true, data: result})
    } catch (error) {
        res.status(500).send("Something went wrong, check logs")
    }
}

exports.getAtask = async(req,res) =>{
    try {
        const {id} = req.params
        console.log(id,"iddddd")
        const result = await TaskModel.findById(id)
        res.status(200).json({
            message:"Task fetched successfully",
            status: true,
            data: result
        })
    } catch (error) {
        res.status(500).send({message: "The id doesn't exist"})
    }
}

exports.deleteBoard = async(req,res)=>{
    try {
        const id = req.params.id
        const data = await TaskModel.findByIdAndDelete(id)
        res.status(200).json({message: "Board Deleted successfully", status: true})
    } catch (error) {
        res.status(500).send(error)
    }
}