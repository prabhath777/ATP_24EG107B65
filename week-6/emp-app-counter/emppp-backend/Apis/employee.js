import exp from 'express'
import { EmpModel } from '../Models/Emp.js'



export const EmpApp = exp.Router()

EmpApp.post('/emp',async(req,res)=>{
    const newemp = req.body
    const newempdoc = new EmpModel(newemp)
    await newempdoc.save()
    res.status(201).json({message:"New emp Created"})
})


EmpApp.get('/emps',async(req,res)=>{
    let emplist = await EmpModel.find()
    res.status(200).json({message:"employees",payload:emplist})
})


EmpApp.put('/edit/:id',async(req,res)=>{
    const modifiedemp = req.body
    const empid = req.params.id

    const updated = await EmpModel.findByIdAndUpdate(empid,{$set:{...modifiedemp}},{new:true})
     res.status(201).json({message:"updates",payload:updated})
})


EmpApp.delete('/remove/:id',async(req,res)=>{
    const empid = req.params.id
    const emp = req.body

    const deleteemp = await EmpModel.findByIdAndDelete(empid,{$unset:{...emp}},{new:true})
    res.status(201).json({message:"delteds",payload:deleteemp})
})