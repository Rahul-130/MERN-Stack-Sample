const exp = require('express')
const productApp = exp.Router()

// body parser middleware
productApp.use(exp.json())

// Products API

productApp.post('/create-product', (request, response)=>{
    // get productsCollectionObj
    const productsCollectionObj = request.app.get('productsCollectionObj')

    // create newProduct from request
    let newProduct = request.body;

    productsCollectionObj.insertOne(newProduct)
    .then(dbRes => {
        response.status(201).send({message: "Product added"})
    })
    .catch(err => {
        console.log("Error in adding a Product: " + err);
        response.send({message: "Error", errMessage: err.message})
    })
})

productApp.get('/get-products',(request, response)=>{
    // get productsCollectionObj
    const productsCollectionObj = request.app.get('productsCollectionObj')

    // get product from db
    productsCollectionObj.find().toArray()
    .then((dbRes)=>{
        response.status(200).send({message: "List of products", payload: dbRes})
    })
    .catch(err => {
        console.log("Error in getting a Products: " + err);
        response.send({message: "Error", errMessage: err.message})
    })
})

productApp.get('/get-products/:id',(request, response)=>{
    // get productsCollectionObj
    const productsCollectionObj = request.app.get('productsCollectionObj')
    // get productId from url/request
    let productId = +request.params.id
    // get product from db
    productsCollectionObj.findOne({id:productId})
    .then((dbRes)=>{
        response.status(200).send({message: "products details", payload: dbRes})
    })
    .catch(err => {
        console.log("Error in getting a Product details: " + err);
        response.send({message: "Error", errMessage: err.message})
    })
})

productApp.put('/update-product',(request, response)=>{
    // get productsCollectionObj
    const productsCollectionObj = request.app.get('productsCollectionObj')

    // get modifiedProduct from client/request
    let updatedProduct= request.body

    // update product in DB
    productsCollectionObj.updateOne({id:updatedProduct.id}, {$set:{...updatedProduct}})
    .then(dbRes =>{
        response.status(200).send({message:"product details updated"})
    })
    .catch(err => {
        console.log("Error in getting a Product details: " + err);
        response.send({message: "Error", errMessage: err.message})
    })
})


productApp.delete('/delete-product/:id', (request, response)=>{
    // get productsCollectionObj
    const productsCollectionObj = request.app.get('productsCollectionObj')

    // get productId from url/request
    let productId = +request.params.id

    // delete product from db
    productsCollectionObj.deleteOne({id:productId})
    .then(dbRes =>{
        response.status(200).send({message: "product deleted"})
    })
    .catch(err => {
        console.log("Error in adding a Product: " + err);
        response.send({message: "Error", errMessage: err.message})
    })
})


module.exports = productApp