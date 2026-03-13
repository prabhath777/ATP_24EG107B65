import { Schema,model } from 'mongoose'


const ProductSchema = new Schema({
    productID:{
        type:Number,
        required:[true,"product id required"],
        unique:[true,"product id should be unique"]

    },
    productName:{
        type:String,
        required:[true,"prdname required"],
       
       unique:[true,"product name needed"]
    },
    price:{
        type:Number,
        required:[true,"price required"],
        min:[100,"ntg"],
        max:[100000,"qw"]
    },
    brand:{
        type:String,
        required:[true,"erew"]
    }
},{
    versionKey: false,
    timestamps: true,
})

export const ProductModel = model("product",ProductSchema)