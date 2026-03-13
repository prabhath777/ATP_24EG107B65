


import jwt from 'jsonwebtoken'

const {verify}= jwt





export function verifyToken(req,res,next) {
    console.log("token",req.cookies)
    const token = req.cookies?.token
    if(!token){
        return res.status(401).json({message:"login avvu bro"})
    }
    try{
    const decoded = verify(token,'prabs')
        console.log(decoded)
        next();
    }catch(err){
        res.status(401).json({message:"session expired"})
    }
}









//to access cookies property of the request we ned to use cookie parser midleware
//otherwise req.cookies is undefined