const BoardModel = require("../model/board")
const TaskModel = require("../model/task")
const mongoose = require('mongoose');

exports.createTask = async(req,res)=>{

    res.setHeader("Access-Control-Allow-Origin", "*");
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
            status: false,
            data: task
        })
    } catch (error) {
        console.log(error, "errorrrrrrrrrr")
        if(error.keyPattern.title){
            return res.status(404).send({
                message:"Title already used"
            })
        }
        return res.status(422).send({
            message:"Data is not in the right format"
        })
      
    }
}

exports.getAtask = async(req,res)=>{
    
    try {
        const {id} = req.params
        console.log(id,"iddddd")
        const result = await TaskModel.findById(id)
        res.status(200).json({
            message:"Data fetched successfully",
            status: true,
            data: result
        })
    } catch (error) {
        res.status(422).send({message: "The id doesn't exist"})
    }
}

exports.getAllBoardtasks = async(req,res)=>{

    const  {id} = req.params

    try {
        const result = await TaskModel.find({"boardId":id}).populate("author")
      
        const doneStatus = await TaskModel.find({status:"done","boardId":id})

        const doingStatus = await TaskModel.find({status:"doing", "boardId":id})

        const todoStatus = await TaskModel.find({status:"todo", "boardId":id})

        const appBoard = [
            {
                columnTitle: "todo",
                _id:1,
                tasks: todoStatus
            },
            {
                columnTitle: "doing",
                _id:2,
                tasks: doingStatus
            },
            {
                columnTitle: "done",
                _id:3,
                tasks: doneStatus
            }
        ]

        return res.status(200).json({message:"Successfully retrieved all tasks", status: true, data: appBoard})
    } catch (error) {
        res.status(422).send("Something went wrong, check logs")
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
        res.status(422).send("Something went wrong, check logs")
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
        res.status(422).send("Something went wrong, check logs")
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
        res.status(422).send("Something went wrong, check logs")
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
        res.status(422).send({message: "The id doesn't exist"})
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
        res.status(422).send(error)
    }
}

exports.deleteTask = async(req,res)=>{
    try {
        const id = req.params.id
        const data = await TaskModel.findByIdAndDelete(id)
        res.status(200).json({message: "Task Deleted successfully", status: true})
    } catch (error) {
        res.status(422).send(error)
    }
}


exports.updateSubTaskStatus = async(req,res)=>{
    try {
        const {id} = req.params
    
        const objectId = mongoose.Types.ObjectId(id);
      
       console.log(id,"iddddddd")
       const data = await TaskModel.find({
        "subtask._id": { $eq : objectId}}, { 'subtask': 1})

         const subtask = data[0].subtask
       const  updatedData = subtask.filter((item)=>{
        return String(item._id)  === String(objectId)
       })

       console.log( !(updatedData[0].isCompleted), "dataaaaa supported" )

       if (updatedData[0].isCompleted === "false") {
           console.log(false)
          const data = await TaskModel.update(
            
            { },
           { $set: { "subtask.$[elem].isCompleted" : "true"} },
           {multi: true,  arrayFilters: [ { "elem._id":  {$eq: objectId}  } ] } )
       }

       if (updatedData[0].isCompleted === "true") {
          const data = await TaskModel.update(
            { },
           { $set: { "subtask.$[elem].isCompleted" : "false"} },
           {multi: true,  arrayFilters: [ { "elem._id":  {$eq: objectId}  } ] } )
          console.log(true)
       }
       
        return res.status(200).send({status:true, message:"Subtask status updated"})

    } catch (error) {
        console.log(error)
        res.status(422).send({message: "The id passed doesn't exist"})
    }
}

exports.updateSubtask = async(req,res)=>{
    try {
        const {name} = req.body
        const {id} = req.params

        const objectId = mongoose.Types.ObjectId(id);
        const data = await TaskModel.update(
            
           { },
           { $set: { "subtask.$[elem].name" : name} },
           {multi: true,  arrayFilters: [ { "elem._id":  {$eq: objectId}  } ] }
        )
    
        return res.status(200).send({status:true, message:"Subtask updated to completed"})
      

    } catch (error) {
        console.log(error)
        res.status(422).send({message: "The id passed doesn't exist"})
    }
}

exports.addSubtask = async(req,res)=>{
    try {
        const {taskId, subtasks}  = req.body
        
        //const data = await TaskModel.findById(taskId)

        const data = await TaskModel.updateOne(
            { _id: taskId },
            { $push: { subtask: { $each: subtasks } } }
         )
         return res.status(200).send({status:true, message:"Subtask Added successfully"})
    } catch (error) {
        console.log(error)
        res.status(422).send({message: "The id passed doesn't exist"})
    }
}


exports.deleteSubtask = async(req,res)=>{
    try {

        const {id} = req.params
        const objectId = mongoose.Types.ObjectId(id);
        const data = await TaskModel.updateMany(
            {},
            { $pull: { subtask: { _id: objectId} } }
        )
         console.log(data, "dataaaaaaaaaaaaaa")
        return res.status(200).send({status:true, message:"Subtask Deleted Successfully"})
    } catch (error) {
        console.log(error)
       return res.status(422).send({message: "The id passed doesn't exist"})
    }
}

exports.getAllSubtasks = async(req,res)=>{
    try {
        const {id}  = req.params

        const objectId = mongoose.Types.ObjectId(id);
       
        const data = await TaskModel.find({_id: objectId})


        return res.status(200).send({status:true, message:"Subtasks successfully retrieved", subtask:data[0].subtask})
    } catch (error) {
        console.log(error)
       return res.status(422).send({message: "The id passed doesn't exist"})
    }
}
 


