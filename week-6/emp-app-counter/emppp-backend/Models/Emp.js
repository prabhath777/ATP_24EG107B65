import { Schema,model } from "mongoose";

const EmpSchema = new Schema({


    name:{
        type:String,
        unique:[true,"dsfdw"]
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    companyname:{
        type:String
    }
},{
    versionKey: false,
    timestamps:true,
})


export const EmpModel = model("emp",EmpSchema)