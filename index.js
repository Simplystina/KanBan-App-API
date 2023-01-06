const express = require("express")
const bodyParser = require("body-parser")
const passport = require("passport")
const {connect } = require("./database/index")

//import Routerd
const authRouter = require("./routes/auth")
const boardRouter = require("./routes/board")
const taskRouter = require("./routes/task")

require("dotenv").config()
require("./middleware/Auth")


const PORT = process.env.PORT || 3334
connect()




const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())


app.use('/',authRouter)
app.use('/board', passport.authenticate('jwt', {session:false}),boardRouter)
app.use('/task', passport.authenticate('jwt', {session:false}), taskRouter)

app.get('/',(req,res)=>{
    res.status(200).send({status:true, message:"Home Route"})
})

app.use('*', (req, res) => {
    return res.status(404).json({ message: 'route not found' })
})


app.listen(PORT, ()=>{
    console.log("Server is listening at ",PORT)
})