// create mini-express app (A router)
const exp = require("express")
const userApp = exp.Router()

require("dotenv").config()  //process.env

const expressAsyncHandler = require('express-async-handler')

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require('./middlewares/verifyToken')

// import multerObj
const multerObj = require("./middlewares/cloudinaryConfig")

// body parser middleware -- built-in  -- used in post and put request
userApp.use(exp.json())





// operation for database

// create user ------------------------------------------------------------------------
userApp.post("/signup", multerObj.single('photo'), expressAsyncHandler(async (request, response) => {
    
    // get usersCollectionObj
    const usersCollectionObj = request.app.get("usersCollectionObj")

    // get newUser from request  JSON.parse()-convets string to object
    const newUser = JSON.parse(request.body.user)

    // check for duplicate user by username
    let userOfDB = await usersCollectionObj.findOne({username: newUser.username})
    // if user already existed, send response to client as "User already existed"
    if(userOfDB != null){
        response.status(200).send({message:"User already existed"})
    }
    // if user not existed
    else{
        // add CDN link of cloudinary image to user obj
        newUser.image = request.file.path
        // hash the password (salt -len can be from 1to10 it indicates the no.of time hashing)
        let hashedPassword = await bcryptjs.hash(newUser.password,5)
        // replace plain password with hashed password
        newUser.password = hashedPassword
        // insert user into DB
        await usersCollectionObj.insertOne(newUser)
        response.status(201).send({message:"User created"})
    }
}))
// -------------------------------------------------------------------------------------


// PRIVATE ROUTE
// get user by username ----------------------------------------------------------------
userApp.get('/get-user/:username',verifyToken, expressAsyncHandler(async(request, response)=>{
    // get usersCollectionObj
    const usersCollectionObj = request.app.get('usersCollectionObj')

    // get username from url
    let usernameFromUrl = request.params.username
    // find the user by username
    const userOfDB = await usersCollectionObj.findOne({username: usernameFromUrl})
    // if user not exited
    if(userOfDB === null){
        response.status(200).send({message:"User not found"})
    }
    // if user existed
    else{
        // remove password from userOfDB
        delete(userOfDB.password)
        response.status(200).send({message:"User", payload:userOfDB})
    }
}))
// -------------------------------------------------------------------------------------


// delete user by username
// PRIVATE ROUTE
userApp.delete("/remove-user/:username", verifyToken, expressAsyncHandler(async(request, response)=>{
    // get usersCollection
    const usersCollectionObj = request.app.get("usersCollection")

    // get username from url
    let usernameOfUrl = request.params.username

    // delete user by username
    await usersCollectionObj.deleteOne({username:usernameOfUrl})
    response.status(200).send({message:"User removed"})
}))
//---------------------------------------------------------------------------------------


// user login
userApp.post("/login",expressAsyncHandler(async(request,response)=> {
    
    // get usersCollectionObj
    const usersCollectionObj=request.app.get("usersCollectionObj")

    // get user credentials from request
    const userCredObj = request.body

    // verify username
    let userOfDB = await usersCollectionObj.findOne({username: userCredObj.username})
    // if username is invalid
    if(userOfDB === null){
        response.status(200).send({message:"Invalid username"})
    }
    // if username is valid
    else{
        // verify the password
        // hash the password and compare with the hashedPassword
        let isEqualPassword = await bcryptjs.compare(userCredObj.password, userOfDB.password)
        // if passwords not matched
        if(isEqualPassword === false){
            response.status(200).send({message:"Invalid password"})
        }
        // if password matched
        else{
            // create a JWT token
            //create and encode the token sign(payload ,secretKey, options) secretkey-should be lengthy string
            let jwtToken = jwt.sign({username:userOfDB.username}, process.env.SECRET_KEY, {expiresIn:"1d"})
            // send token in response
            delete(userOfDB.password)
            response.status(200).send({message:"success", token: jwtToken, user: userOfDB})
        }
    }
}))


// PRIVATE ROUTE
userApp.get("/test", verifyToken, expressAsyncHandler(async(request, response)=>{
    response.send({message:"Reply from private route"})
}))


//PUBLIC ROUTES
  //route to send all led tvs
  //route to send detailes of a selected product
  //route to send reviews of a selected product

//PRIVATE /PROTECTED ROUTES
  //route to write a review
  //route to buy a product



// export userApp
module.exports = userApp