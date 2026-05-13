import exp from 'express'
import {UserModel} from '../models/UserModel.js'
import { hash,compare } from "bcrypt";
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middlewares/verifyToken.js'
import cloudinary from '../config/cloudinary.js'
import { upload } from '../config/multer.js'
import { uploadToCloudinary } from '../config/cloudinaryUpload.js'
const {sign}=jwt
export const commonApp=exp.Router()

//router to rigester user
commonApp.post("/user", upload.single("profileImageUrl"), async (req, res, next) => {
  let cloudinaryResult;
  try {
    let allowedRoles = ["USER", "AUTHOR"];
    //get user from req
    const newUser = req.body;
    console.log(newUser);
    console.log(req.file);

    //check role
    if (!allowedRoles.includes(newUser.role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    //Upload image to cloudinary from memoryStorage
    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    }

    // console.log("cloudinaryResult", cloudinaryResult);
    //add CDN link(secure_url) of image to newUserObj
    newUser.profileImageUrl = cloudinaryResult?.secure_url;

    //run validators manually
    //hash password and replace plain with hashed one
    newUser.password = await hash(newUser.password, 12);

    //create New user document
    const newUserDoc = new UserModel(newUser);

    //save document
    await newUserDoc.save();
    //send res
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.log("err is ", err);
    //delete image from cloudinary
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    next(err);
  }
});


// Route for Login (USER,ADMIN,AUTHOR)
commonApp.post('/login',async(req,res)=>{
    // get email,password from req.body
    const {email,password}=req.body
    // verify email and password
    const user=await UserModel.findOne({email:email})
    if(!user){
        return res.status(400).json({message:"Invalid email"})
    }
    const vaildPassword=await compare(password,user.password)
    if(!vaildPassword){
        return res.status(400).json({message:"Invaild password"})
    }

    // after verification generate a token 
    const signedToken=sign({id:user._id,email:email,role:user.role},process.env.SECRET_KEY,{expiresIn:'1h'})
    // store the token in httpOnly cookie
    res.cookie("token",signedToken,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    // delete password from user object
    const userObj=user.toObject()
    delete userObj.password
    res.status(200).json({message:"Login sucess",payload:userObj})

})
// Route for Logout
commonApp.get("/logout",(req,res)=>{
    res.clearCookie("token",{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    res.status(200).json({message:"Logout success"})
})

// change password
commonApp.put("/password",verifyToken("USER","AUTHOR","ADMIN"),async(req,res)=>{
    // check current password and new password are same
    const {currentPassword,newPassword}=req.body
    if(currentPassword===newPassword){
        return res.status(400).json({message:"Password should not be same"})
    }
    // get current password of user/admin/author
    const userId=req.user?.id
    const UserDocument=await UserModel.findById(userId)
    const isMatch=await compare(currentPassword,UserDocument.password)
    if(!isMatch){
        return res.status(400).json({message:"Yours current password is wrong"})
    }
    const newPasswordHash=await hash(newPassword,12)
    UserDocument.password=newPasswordHash
    await UserDocument.save()
    res.status(200).json({message:"password changed successfully"})
})