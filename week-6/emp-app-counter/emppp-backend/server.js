import exp from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { EmpApp } from './Apis/employee.js'
import cors from 'cors'

config()

const app = exp()
const PORT = process.env.PORT || 3000

app.use(cors()) // relax for now
app.use(exp.json())
app.use(EmpApp)

const startServer = async () => {
  console.log("Starting server...")
  console.log("MONGO_URI exists:", !!process.env.MONGO_URI)

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Database connected successfully")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

  } catch (err) {
    console.error("DB connection failed:", err)
    process.exit(1) // CRASH properly
  }
}

startServer()