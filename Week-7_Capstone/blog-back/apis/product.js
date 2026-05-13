import exp from 'express'

import { ProductModel } from '../models/ProductModel.js'
export const ProductApp = exp.Router()

ProductApp.post("/product",async(req,res)=>{
    const newproduct = req.body
    
    const newprd = new ProductModel(newproduct)
    await newprd.save()
    res.status(201).json({message:"product stocked"})
})

ProductApp.get("/product",async(req,res)=>{
    const prdlist = await ProductModel.find()
    res.status(201).json({message:"avilable products",payload:prdlist})
})

ProductApp.get("/product/:id",async(req,res)=>{
    const pid = req.params.id

    const prd = await ProductModel.findById(pid)
    if(!prd){
        res.status(404).json({message:"product not found"})

    }
    res.status(201).json({message:"product found",payload:prd})
})

ProductApp.put("/product/:id",async(req,res)=>{
    const pid = req.params.id
    const mprd = req.body
    const updated = await ProductModel.findByIdAndUpdate(pid,{$set:{...mprd}},{new:true,runValidators:true})
    res.status(201).json({message:"product updated",payload:updated})
})

ProductApp.delete("/product/:id",async(req,res)=>{
    const pid = req.params.id
    const mprd = req.body
    const updated = await ProductModel.findByIdAndDelete(pid)
    res.status(201).json({message:"product deleted"})
})