import exp from 'express'
import {connect} from 'mongoose'
import { UserApp } from './apis/user.js'
import { ProductApp } from './apis/product.js'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import cors from 'cors'
import { AuthorApp, ArticleApp } from './apis/article.js'

config()
const app = exp()
const port = process.env.PORT || 4000

app.use(exp.json())

// enable CORS for frontend dev server and allow credentials
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.use(cookieParser())

// mount routers
app.use('/author-api', AuthorApp)
app.use('/user-api', ArticleApp)
app.use('/user-api', UserApp)
app.use('/auth', UserApp)
app.use('/product-api',ProductApp)

//connect to db server
async function connectDB() {
    try{
    await connect(process.env.DB_URL || 'mongodb://127.0.0.1:27017/blogdb')
    app.listen(port,()=>console.log(`server is listening on port ${port}`))
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





































































