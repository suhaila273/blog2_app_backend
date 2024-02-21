const mongoose=require("mongoose")


const signupSchema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true
        },
        age:String,
        mobile:String,
        email:String,
        password:String
    }
)

module.exports=mongoose.model("signup",signupSchema)