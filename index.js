const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const passport = require("passport")
const {connect } = require("./database/index")

//import Router
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


app.options('*', cors()); // preflight OPTIONS; put before other routes
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

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