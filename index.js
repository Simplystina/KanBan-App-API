const express = require("express")
const bodyParser = require("body-parser")
const passport = require("passport")
const {connect } = require("./database/index")
const authRouter = require("./routes/auth")
require("dotenv").config()
require("./middleware/Auth")
const PORT = process.env.PORT || 3334
connect()




const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())


app.use('/',authRouter)

app.get('/',(req,res)=>{
    res.status(200).send({status:true, message:"Home Route"})
})




app.listen(PORT, ()=>{
    console.log("Server is listening at ",PORT)
})