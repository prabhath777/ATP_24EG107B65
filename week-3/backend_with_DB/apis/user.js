import exp from 'express'
import { UserModel } from '../models/UserModel.js'
import {hash,compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {verifyToken} from'../middlewares/verifyToken.js'
const {sign} = jwt
export const UserApp = exp.Router()


UserApp.post('/users',async(req,res)=>{
const newUser = req.body

const hashed = await hash(newUser.password,10)
newUser.password = hashed
const newUserDocument = new UserModel(newUser)
newUser.password = hashed
// const insertedUsers = await UserModel.insertMany(newUser)
await newUserDocument.save()
// await insertedUsers.save()
res.status(201).json({message:"User created successfully"})
})


//--v refres to version key which refres to number of times document modified
UserApp.post('/auth',async(req,res)=>{
    const {email,password} = req.body
    let user = await UserModel.findOne({email:email})
    if(!user){
        res.status(404).json({message:"invalid email"})
    }
   let result =  await compare(password,user.password)
   if(!result){
    res.status(400).json({message:"invalid password"})
   }
//    res.status(201).json({message:"valid user"})

  const signedToken =  sign({email:user.email},"prabs",{expiresIn:"1h"})
//   res.status(200).json({message:"signed token",token:signedToken})
   res.cookie("token",signedToken,{
    httpOnly:true,
    //sameSite:"none" //csrf vunerability
    sameSite:"lax",
    secure:false
   })
    res.status(201).json({message:"valid user",payload:user})
})

//read all users 

UserApp.get('/users',verifyToken,async(req,res)=>{
    let userlist = await UserModel.find()
    res.status(201).json({message:"Userlist",payload:userlist})
})


UserApp.get('/users/id/:id',async(req,res)=>{
    const uid = req.params.id
    // const user = await UserModel.findOne({_id:uid})
    //use find one method to read a document with non object id fields 
    
    const user = await UserModel.findById(uid)  //use when you are specificlly finding by user by id
    if (!user){
        res.status(404).json({message:"user not found"})
    }
    res.status(201).json({message:"Userlist",payload:user})

    
})


//in express when we are finding anything by the filed name of document first the request hts the first route we defined 
//in this case first we defined the get user by id and when we writeanother route for getting user by name the request hits the 
//the user id route and take username as id which coauses error so it is better to define clear routes in this case id/:id
//so that routing will be clear and no error will occur 
UserApp.get('/users/:username', async (req, res) => {

    const nme = req.params.username

    const user = await UserModel.findOne({ username: nme })

    res.status(200).json({
        message: "User found",
        payload: user
    })

})

UserApp.put('/users/:id',async(req,res)=>{
    const modifieduser = req.body
    const uid = req.params.id

    const updated = await UserModel.findByIdAndUpdate(uid,{$set:{...modifieduser}},{new:true,runValidators:true})
    res.status(201).json({message:"Userupdated",payload:updated})
})


UserApp.delete('/users/:id',async(req,res)=>{
    const user = req.body
    const uid = req.params.id
    // if(!user){
    //      res.status(404).json({message:"user not found"})
    // }
    const deleteduser = await UserModel.findByIdAndDelete(uid,{$unset:{...user}},{new:true})
    if(!deleteduser){
         res.status(404).json({message:"user not found"})
    }
    res.status(200).json({message:"Userdeleted",payload:deleteduser})
})

//http codes

//200 -- success
//201 -- created
//400 -- bad request
//401 -- unauthorized
//404 -- not found
//500 -- server side error

//routes               Who can access ?
//public routes    --  By anyone
//protected routes --  By only authticated users only


