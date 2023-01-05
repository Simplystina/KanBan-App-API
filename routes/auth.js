const express = require('express')
const passport = require("passport")
const jwt = require('jsonwebtoken')

require("dotenv").config()

const authRouter = express.Router()


authRouter.post(
    '/signup',
    async(req,res,next)=>{
        passport.authenticate('signup',{session:false}, async(err, user)=>{
            try {
                if(err){
                    console.log(err, "erorrrrrrr")
                    res.status(409).send("Email already exists")
                    return next(err)
                }
            
                if(!user){
                   return res.status(400).json({
                        message: 'Invalid data'
                    })
                }
                res.status(201).json({
                    message: 'Signup Successful',
                    user: user 
                })
            } catch (error) {
                res.status(409).json({
                    message: "Email already exists"
                })
            }
        })(req,res,next)
    }
)
authRouter.post(
    '/login',
    async(req,res,next)=>{
        passport.authenticate('login', async(err, user,info)=>{
            try {
               
                if(err){
                    return next(err)
                }
                console.log(user,info,"usered")
                if(!user){
                    const error = new Error('email or password is incorrect')
                    res.status(404).send("Email or password is incorrect")
                    return next(error)
                }

                req.login(user, {session: false},
                    async(error)=>{
                        if(error) return next(error)

                        const body = {_id:user._id, email: user.email}
                        //You store the id and email in the payload of the JWT. 
                        // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
                        // DO NOT STORE PASSWORDS IN THE JWT!

                        const token = jwt.sign({user:body}, process.env.JWT_SECRET, { expiresIn: '1h' })

                        return res.status(200).json({token, user})
                    }

                    )
            } catch (error) {
                return next(error)
            }
        } ) (req,res,next)
    }
)

module.exports = authRouter