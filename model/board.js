const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const BoardModel = new Schema(
    {
        id: ObjectId,
        name : {type: String, unique: true, required: true},
        collaborators: [{type: String}],
        userId: [{ type: ObjectId}],

    },
    {
        timestamps: true, toJSON: {virtuals: true}
    }
)


const Board = mongoose.model("boards", BoardModel)
module.exports = Board