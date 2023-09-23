// create express app
const exp = require("express")
const app = exp()
require('dotenv').config()
// assign port number
const port = process.env.PORT || 4000

// assign port number
app.listen(port, ()=>console.log(`web server listening on port ${port}..`))


// -------------------------------------------
const path = require("path")
// connect react build
app.use(exp.static(path.join(__dirname, './build')))
// --------------------------------------------


// get mongo client
const mongoClient = require('mongodb').MongoClient;

// connect to DB server using mongo client
mongoClient.connect('mongodb://127.0.0.1:27017')
.then((dbRef) => {
    // connect to a database
    const dbObj = dbRef.db('testdb');
    // connect to collection of this database
    const usersCollectionObj = dbObj.collection('userscollection')
    const productsCollectionObj = dbObj.collection('productscollection')

    // share collections to APIs  'usersCollectionObj'-key   usersCollectionObj-object
    app.set('usersCollectionObj', usersCollectionObj)
    app.set('productsCollectionObj', productsCollectionObj)

    console.log("DB connection success");
})
.catch(err => console.log("database connect error :", err))


// import userApp
const userApp = require("./APIs/usersApi")

// import productApp
const productApp = require('./APIs/productsApi')



// forward request to usersApi when url path starts with /users-api
app.use('/users-api', userApp)

// forward request to productsApi when url path starts with /products-api
app.use('/products-api',productApp)






// middleeare to deal with page refresh
const pageRefresh = (request, response, next) =>{
    response.sendFile(path.join(__dirname, './build/index.html'), err =>{
        if(err){
            next(err)
        }
    })
}
app.use("*", pageRefresh)


// invalid path
const invalidPathMiddleware = (request, response, next)=>{
    response.send({message:`Invalid path`})
}
app.use(invalidPathMiddleware)

// error handling middleware
const errorHandlingMiddleware = (error, request, response, next)=>{
    response.send({message: error.message})
}

app.use(errorHandlingMiddleware)