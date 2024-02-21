const express=require("express")


const router=express.Router()

const bcrypt=require("bcryptjs")

hashPasswordGenerator=async(pass)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)
}

const userModel = require("../models/userModel")

router.post("/register",async(req,res)=>{
    let {data}={"data":req.body}

    let password=req.body.password
    console.log(password)

    const hashedPassword=await hashPasswordGenerator(password)
    console.log(hashedPassword)
    
    data.password=hashedPassword

    let signup=new userModel(data)
    let result=await signup.save()
    res.json({
        status:"success"
    })
})



module.exports=router