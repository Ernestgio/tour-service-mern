// Main file
// Author : Ernest Giovanni

// Include Library
const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const MongoStore = require('connect-mongo')(session)
const cors = require('cors')
const seedDB = require("./Seed")
const pat = require('path')


//include models
const User = require("./models/User")
const APILog = require("./models/API logs")

// Define port and db uri
const app = express()
PORT = process.env.PORT || 5000 
MONGO_URI = ""

//Google client ID for oauth

// Use url encoded body parser
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors())

//Connect to db
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        console.log(`MongoDB connected: ${conn.connection.host}`)
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}
connectDB()


//Sessions
// app.use(session({
//     secret: "my secret",
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({mongooseConnection : mongoose.connection}),
// }))

//Pasport middleware
// app.use(passport.initialize())
// app.use(passport.session())

//Passport strategy
// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback"
//   },
//   async (accessToken, refreshToken, profile, done)=> {
//     const newUser ={
//         googleId : profile.id,
//         displayName : profile.displayName,
//         toker : accessToker
//     }
//     try{
//         let user = await User.findOne({googleId:profile.id})

//         if(user){
//             done(null,user)
//         }
//         else{
//             user = await User.create(newUser)
//             done(null,user)
//         }
//     } catch(err){
//         console.log(err)
//     }
//   }
// ))

//Serialize and deserialize user
// passport.serializeUser((user,done)=>{
//     done(null,user.id)
// })
// passport.deserializeUser((id,done)=>{
//     User.findById(id,(err,user)=>{
//         done(err,user)
//     })
// })



//logging middleware

const logFunction = function(req,res,next){
    const newActivity = {
        url: req.url,
        method: req.method,
        status: res.statusCode,
        date: Date.now
    }
    try{
        APILog.create(newActivity,(err,createdActivity)=>{
            if(err){
                console.log(err)
                next()
            }
            else{
                next()
            }
        })
    }catch(err){
        console.log(err)
    }
}
app.use(logFunction)




//seedDB()

//Routes
const indexRoutes = require("./routes/index")
const tourRoutes = require('./routes/Tour Routes')
// const authRoutes = require("./routes/auth")

app.use("/",indexRoutes)
app.use("/services",tourRoutes)
// app.use("/auth",authRoutes)

//initialize server in localhost 5000
app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)