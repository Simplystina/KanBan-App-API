const BoardModel = require("../model/board")

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
        res.status(500).send({message: "The id doesn't exist"})
    }
}

exports.getAllBoards = async(req,res)=>{
    try {

        const userId = req.user._id
        const result = await BoardModel.find({"userId": userId})
        res.status(200).json({message:"Successfully retrieved", status: true, data: result})
    } catch (error) {
        res.status(500).send("Something went wrong, check logs")
    }
}

exports.updateBoard = async(req,res)=>{
    try {
        const id = req.params.id
        const data = req.body
        const update = await BoardModel.findByIdAndUpdate(id, data, {new:true})
        res.status(200).json({message: "Board updated successfully", status: true, data:update})

    } catch (error) {
        res.status(500).send(error)
    }
}

exports.deleteBoard = async(req,res)=>{
    try {
        const id = req.params.id
        const data = await BoardModel.findByIdAndDelete(id)
        res.status(200).json({message: "Board Deleted successfully", status: true})
    } catch (error) {
        res.status(500).send(error)
    }
}