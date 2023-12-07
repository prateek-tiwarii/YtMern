import mongoose from"mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt"; 


const userSchema = new mongoose.Schema({

username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    index:true,
    trim:true,
},

email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
},

fullname:{
    type:String,
    required:true,
    index:true,
    trim:true,
},

avtar:{
    type:String,
    required:true,
},

coverImage:{
    type:String,
    required:true,
},

watchHistory:[
    {
    type: Schema.Types.ObjectId,
    ref: "Video"

    },
],

password:{
    type:String,
    required:[true,"Password is required"]
},

refreshToken:{
    type:String
}





},{timestamps:true});


userSchema.pre("save", async function(next){
    this.password = bcrypt.hash(this.password,10)
    next()
})


userSchema.method.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)
}


userSchema.methods.genrateAccessToken = function(){
return jwt.sign(
    {
        _id: this._id,
        username : this.username,
        email: this.email,
        fullname: this.fullname

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }


)

}


export const User = mongoose.model("User",userSchema);
