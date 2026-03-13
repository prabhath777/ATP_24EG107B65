import exp from 'express'
import {connect} from 'mongoose'
import { UserApp } from './apis/user.js'
import { ProductApp } from './apis/product.js'
import cookieParser from 'cookie-parser'
const app = exp()
const port = 4444

app.use(exp.json())

app.use(cookieParser())
app.use('/user-api',UserApp)
app.use('/product-api',ProductApp)
//connect to db server
async function connectDB() {
    try{
    await connect("mongodb://localhost:27017/backend")
    app.listen(port,()=>console.log(`https server is listening to port ${port}`))
    console.log("database connected successfuly")
    }catch(err){
        console.log("err in DB connection:",err)
    }
}
connectDB()
//error handling middleware
app.use((err,req,res,next)=>{
console.log(err.name)
if(err.name == 'ValidationError'){
   res.status(400).json({message:"error ochindi",error:err.message}) 
}

if(err.name == 'CastError'){
   res.status(500).json({message:"error ochindi",error:err.message}) 
}

res.status(500).json({message:"error ochindi",error:err.message})
})





































































