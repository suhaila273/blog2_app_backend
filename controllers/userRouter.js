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

router.post("/login",async(req,res)=>{

    let input=req.body
    let email=req.body.email
    let data=await userModel.findOne({"email":email})
    if(!data){
        return res.json(
            {
                status:"invalid email id"
            }
        )
    }

    console.log(data)
    
    let dbPassword=data.password
    let inputPassword=req.body.password
    console.log(dbPassword)
    console.log(inputPassword)
    const match=await bcrypt.compare(inputPassword,dbPassword)
    if(!match)
    {
        return res.json(
            {
                status : "incorrect password"
            }
        )
    }
    res.json({
        status : "success","userdata":data
    })
})

module.exports=router