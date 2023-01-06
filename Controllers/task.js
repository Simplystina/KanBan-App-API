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

exports.updateTask = async(req,res)=>{
    try {
        const id = req.params.id
        const data = req.body

        const result = await TaskModel.findById(id)

        const update = await TaskModel.findByIdAndUpdate(id, data, {new:true})
        console.log(data, update,"updated data")
        res.status(200).json({message: "Task updated successfully", status: true, data:update})

    } catch (error) {
        res.status(500).send(error)
    }
}

exports.deleteTask = async(req,res)=>{
    try {
        const id = req.params.id
        const data = await TaskModel.findByIdAndDelete(ighad)
        res.status(200).json({message: "Board Deleted successfully", status: true})
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.getDonetasks = async(req,res)=>{
    const  {id} = req.params

    const findQuery = {}
    findQuery.boardId = id
    findQuery.status = "done"
    try {
        
        
        const result = await TaskModel.find(findQuery)
        
        res.status(200).json({message:"Successfully retrieved Done Tasks", status: true, data: result})
    } catch (error) {
        res.status(500).send("Something went wrong, check logs")
    }
}
exports.getDoingtasks = async(req,res)=>{
    const  {id} = req.params

    const findQuery = {}
    findQuery.boardId = id
    findQuery.status = "doing"
    try {
        
        
        const result = await TaskModel.find(findQuery)
        
        res.status(200).json({message:"Successfully retrieved Doing Tasks", status: true, data: result})
    } catch (error) {
        res.status(500).send("Something went wrong, check logs")
    }
}

exports.getTodotasks = async(req,res)=>{
    const  {id} = req.params

    const findQuery = {}
    findQuery.boardId = id
    findQuery.status = "todo"
    try {
        
        
        const result = await TaskModel.find(findQuery)
        
        res.status(200).json({message:"Successfully retrieved Todo Tasks", status: true, data: result})
    } catch (error) {
        res.status(500).send("Something went wrong, check logs")
    }
}

exports.updateSubTask = async(req,res)=>{
    try {
        const {task, taskId} = req.body
        
        const data = await TaskModel.findById(taskId)
        console.log(data,"subtaskkkkkkkk", task)
        data.updateOne(
            { _id: taskId },
            { $push: { subtask: task} }
         )
        
        return res.status(201).json({message:`You have successfully updated subtask field`})

    } catch (error) {
        console.log(error)
        res.status(500).send({message: "The id passed doesn't exist"})
    }
}