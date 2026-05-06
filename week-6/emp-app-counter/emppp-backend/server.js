import exp from 'express'
import {connect} from 'mongoose'
import { config } from 'dotenv'
import { EmpApp } from './Apis/employee.js'
import cors from 'cors'
config()
const app = exp()
const port = process.env.PORT
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST","PUT","DELETE"],
  credentials: true
}))
app.use(exp.json())
app.use(EmpApp)



async function connectDB() {
    try{
    await connect(process.env.DB_URL)
    app.listen(port,()=>console.log(`https server is listening to port ${port}`))
    console.log("database connected successfuly")
    }catch(err){
        console.log("err in DB connection:",err)
    }
}
connectDB()