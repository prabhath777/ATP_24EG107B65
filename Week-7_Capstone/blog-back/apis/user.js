import exp from 'express'
import { UserModel } from '../models/UserModel.js'
import {hash,compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {verifyToken} from'../middlewares/verifyToken.js'
import { config } from 'dotenv'
config()
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


//-- authentication routes
UserApp.post('/login', async (req, res) => {
    const { email, password } = req.body
    let user = await UserModel.findOne({ email: email })
    if (!user) {
        return res.status(404).json({ message: 'invalid email' })
    }
    let result = await compare(password, user.password)
    if (!result) {
        return res.status(400).json({ message: 'invalid password' })
    }

    const signedToken = sign({ email: user.email }, process.env.SECRET_KEY || 'secret123', { expiresIn: '1h' })
    res.cookie('token', signedToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
    })
    return res.status(200).json({ message: 'valid user', payload: user })
})

UserApp.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.status(200).json({ message: 'logged out' })
})

UserApp.get('/check-auth', verifyToken, async (req, res) => {
    // verifyToken attaches full user document to req.user
    return res.status(200).json({ payload: req.user })
})

//read all users 

UserApp.get('/userss',verifyToken,async(req,res)=>{
    let userlist = await UserModel.find()
    res.status(201).json({message:"Userlist",payload:userlist})
})


UserApp.get('/user',verifyToken,async(req,res)=>{
    // const uid = req.params.id
    // const user = await UserModel.findOne({_id:uid})
    //use find one method to read a document with non object id fields 
    //read user email from req.body

    const emailOfUser = req.user?.email
    console.log(emailOfUser)
    const userobj = await UserModel.findOne({email:emailOfUser}).populate("cart.product")
    // const user = await UserModel.findById(uid)  //use when you are specificlly finding by user by id
    if (!userobj){
        res.status(404).json({message:"user not found"})
    }
    res.status(201).json({message:"Userlist",payload:userobj})

    
})


//in express when we are finding anything by the filed name of document first the request hts the first route we defined 
//in this case first we defined the get user by id and when we writeanother route for getting user by name the request hits the 
//the user id route and take username as id which coauses error so it is better to define clear routes in this case id/:id
//so that routing will be clear and no error will occur 
UserApp.get('/users/:username',verifyToken, async (req, res) => {

    const nme = req.params.username

    const user = await UserModel.findOne({ username: nme })

    res.status(200).json({
        message: "User found",
        payload: user
    })

})

UserApp.put('/users/:id',verifyToken,async(req,res)=>{
    const modifieduser = req.body
    const uid = req.params.id

    const updated = await UserModel.findByIdAndUpdate(uid,{$set:{...modifieduser}},{new:true,runValidators:true})
    res.status(201).json({message:"Userupdated",payload:updated})
})


UserApp.delete('/users/:id',verifyToken,async(req,res)=>{
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





//add product to the cart
//how tf you think you gonna get user verified or find him  if you dont fucking pass the 
//the middleware and you are like console logging everything and wandering like a monkey
UserApp.put('/users/cart/prd-id/:pid',verifyToken,async(req,res)=>{
    let productId = req.params.pid
    console.log(productId)
    const emailOfUser = req.user?.email


    const user = await UserModel.findOne({email:emailOfUser})
    console.log(user)
    if(!user){
        return res.status(401).json({message:"user not found"})
    }

    //add prd to cart
    await UserModel.findOneAndUpdate({email:emailOfUser},{$push:{cart:{product:productId}}})
    return res.status(201).json({message:"added"})
})



//UserApp.put('/users/cart/prd-id/:pid',verifyToken,async(req,res)=>{
//     let productId = req.params.pid
//     console.log(productId)
//     const emailOfUser = req.user?.email
    


//     const user = await UserModel.findOne({email:emailOfUser})
//     console.log(user)
//     if(!user){
//         return res.status(401).json({message:"user not found"})
//     }

//     let prd = await UserModel.findOne({email: emailOfUser,
//   "cart.product": productId})
//     if (prd == req.params.pid){
//          await UserModel.findOneAndUpdate({email:emailOfUser},{$set:{cart:{count:+1}}})
//     return res.status(201).json({message:"added"})
//     }
//     //add prd to cart
//     await UserModel.findOneAndUpdate({email:emailOfUser},{$push:{cart:{product:productId}}})
//     return res.status(201).json({message:"added"})
// })
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


//