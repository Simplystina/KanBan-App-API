const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const TaskModel = new Schema(
    {
       id: ObjectId,
       title: {type: String, required: true, unique: true} ,
       description: {type: String},
       subtask : [{
                id: ObjectId,
                name: {type: String},
                isCompleted: {type: String, enum: [true,false], default: false}
            }],
       status: {
        type: String, enum: ['todo',"doing","done"]
       ,required: true},
       boardId: { type: ObjectId, required: true},
       author: {type: mongoose.Schema.Types.ObjectId, ref:"boards"}
    },
    {
        timestamps: true, toJSON: {virtuals: true}
    }
)

const Task = mongoose.model("tasks", TaskModel)
module.exports = Task