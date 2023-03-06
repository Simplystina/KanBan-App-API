const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const UserModel = require("../model/user")
const JWTstrategy = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt
const sendVerificationEmail = require("../utils/sendMail")

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('secret-token')
        },
        async(token, done)=>{
            try{
                return done(null, token.user)
            }catch(error){
                done(error)
            }
        }
    )
)
passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async(req, email, pasword, done)=>{
            try{
                const user = await UserModel.create(req.body)
                console.log(user,"userr")
                await sendVerificationEmail(user, req, res);
                return done(null, user)
            }catch(error){
                return done(error, {message:"Email already exist"})
            }
        }
    )
)

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: "email",
            passwordField: 'password'
        },
        async(email, password, done)=>{
            try {
                console.log(typeof email, email)
                const user = await UserModel.findOne({"email":email})   
                console.log("user", user, email)
                if(!user){
                    return done(null, false, {message: 'User not found'})
                }
                const validate = await user.isValidPassword(password)
            
                console.log(validate, "validate")
                if(!validate){
                    return done(null, false, {message: 'Wrong password entered'})
                }
                 // Make sure the user has been verified
               if (!user.isVerified) return res.status(401).json({ type: 'not-verified', message: 'Your account has not been verified.' });

                return done(null, user, {message: 'logged in Successfully'})
            } catch (error) {
                console.log(error, "error")
                return done(error)
            }
        }
    )
)

