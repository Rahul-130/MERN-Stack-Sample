const jwt = require('jsonwebtoken')
require('dotenv').config()

// write a middleware function to verify token
const verifyToken = (request, response, next)=>{
    // get bearer token key from request.headers
    const bearerToken = request.headers.authorization //Bearer token
    // if bearer token not found
    if(bearerToken === undefined){
        response.send({message: "Unauthorized access.. Plz login first"})
    }
    // if bearer token is existed, get token
    else{
        // get token from bearer token
        let token = bearerToken.split(" ")[1]  //["bearer", token]
        // verify token
        try{
            jwt.verify(token, process.env.SECRET_KEY)
            // calling next middleware
            next()
        }
        catch(err){
            // forward err to err handling middleware
            // next(new Error("Session expired. Please re-login to continue"))
            response.send({message: err.message})
        }
    }

    //if token is valid, allow to access protected route
  //else, ask to login again
}

module.exports=verifyToken;