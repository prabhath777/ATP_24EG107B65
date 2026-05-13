import exp from 'express'
const app = exp()
//use body parser middleware
app.use(exp.json())
//set a port number 
const port = 6969
//assign port number to http server
app.listen(port,()=>console.log(`https server is listening to port ${port}`))

//api
//REST api
//REST stands for representational state transfer




//let us assume this array to be a database as of now
let users = [] // assume this as database

app.get('/users', (req, res) => {
res.json({message:"all users",payload:users})
})




//GET
//route to handle get request
app.get('/users/:id', (req, res) => {
  //handle get request
  //read all users 

  let id = Number(req.params.id)
  let use = users.find(u => u.id === id);
  if(use === -1){
    return res.json({message:"no users"})
  }

  res.json({message:"all users",payload:users})
})



//POST
//route to handle post request
app.post('/users', (req, res) => {
  // handle post request
  
   const newuser = req.body
   users.push(newuser)
    res.json({message:"user created"})
})



//PUT
//route to handle put request


app.put('/users', (req, res) => {
  let mod = req.body;

  let index = users.findIndex(user => user.id === mod.id);

  if (index === -1) {
    return res.json({ message: "User not found" });
  }

  users.splice(index, 1, mod);

  res.json({ message: "User updated successfully" });
});

//DELETE 
//route to handle delete request

//   // handle delete request
//   //get id from user 
//   //use findindex to find the id
//   //delete user 
//   //send response  
//   //console.log(req.params)



app.delete('/users/:id', (req, res) => {
  let objid = Number(req.params.id);

  let index = users.findIndex(u => u.id === objid);

  if (index === -1) {
    return res.json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.json({ message: "User deleted successfully" });
});


// Create REST API for Product resources with below End points

//   Create New Product            POST      /product  done            
//   Read all Products             GET       /products done
//   Read a Product by ID          GET       /products/<productId> done
//   Update a Product by ID        PUT       /products/<productsId>
//   Add a review to a Product     PUT       /products/<productsId>/review
//   Remove a Product by ID        DELETE    /products/<productId>



// Sample Product resource:
//     {
//       productId:" ",
//       productName:"  ",
//       price: " ",
//       brand: " ",
//       reviews : [ ]
    
//     }







let prd = []


//   Read all Products     GET       /products
app.get('/products',(req,res)=>{
 
  return res.json({
    messgae:"products",data:prd
  })
})



//   Read a Product by ID   GET       /products/<productId> 
app.get('/products/:productId',(req,res)=>{

  const id = Number(req.params.productId)
  const prdid = prd.find(u => u.productId === id)

  if(!prdid){
    return res.json({message:"product not found"})
  }else{
    return res.json({
      message:"product found",
      data:prdid
    })
  }
})



//   Create New Product            POST      /product
app.post('/products',(req,res)=>{

  const newprd = req.body
  prd.push(newprd)
  res.json({
    message:"new product added"
  })


})

//   Read a Product by ID          GET       /products/<productId>
app.put('/products', (req,res)=>{
  const prdd = req.body
  const idx = prd.findIndex(u => u.productId === prdd.productId)
  if(idx===-1){
   return res.json({message:"products not found"})
  }else{
    prd.splice(idx, 1, prdd)
  }
  return res.json({
    message: "Product updated successfully",
    data:prd
  })
})




//   Add a review to a Product     PUT       /products/<productsId>/review
app.put('/products/:id/reviews', (req, res) => {
  const id = Number(req.params.id)
  const review = req.body.review

  const product = prd.find(p => p.productId === id)

  if (!product) {
    return res.json({ message: "product not found" })
  }

  product.reviews.push(review)

  return res.json({
    message: "review added",
    data: prd
  })
})

//never leave any operation with out a message 


//   Remove a Product by ID        DELETE    /products/<productId>
app.delete('/products/:productId',(req,res)=>{
  const prddd = Number(req.params.productId)
  const id = prd.findIndex(u => u.productId === prddd)

  if (id === -1){
    return res.json({
      message:"product not found",
      
    })
  }else{
    prd.splice(id,1)
    return res.json({
      message:"product removed",
      data:prd
    })
  }
})