//create user schema and model 

import { Schema,model } from 'mongoose'


const UserSchema = new Schema({
//structure of schema
    username :{
        type:String,
        required:[true,"username avasaram bro"],
        minlength:[5,"min length of user name "],
        maxlength:[12,"username size exceeds"],
       unique:[true,"dsfdw"]
    },
    password:{
        type:String,
        required:[true,"password kavali"]
    },
    email:{
        type:String,
        required:[true,"email kavali"],
       unique:[true,"dsfdw"]
        
    },
    age:{
        type: Number,
    },
},{
    versionKey: false,
    timestamps: true,
},
);

//String - mongoose
//string - js



//genrete model



export const UserModel = model("user",UserSchema)































