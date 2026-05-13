import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { UserModel } from '../models/UserModel.js'

const { verify } = jwt
config()

export async function verifyToken(req, res, next) {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ message: 'login avvu bro' })

  try {
    const decoded = verify(token, process.env.SECRET_KEY || 'secret123')
    const user = await UserModel.findOne({ email: decoded.email })
    if (!user) return res.status(401).json({ message: 'user not found' })
    req.user = user
    next()
  } catch (err) {
    res.status(401).json({ message: 'session expired' })
  }
}

//to access cookies property of the request we need to use cookie parser middleware
//otherwise req.cookies is undefined
