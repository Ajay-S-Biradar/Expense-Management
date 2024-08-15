const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    profileImg:{
        type:String, //i ll provide the link of img uploaded in cloudinary
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUwz1OwjNY59azZJpXVnBD707x4IzgpejvqQ&s",
    },
    password:{
        type:String,
        required:true,
    }
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))  return next();
    this.password = bcrypt.hash(this.password, 10);
    next()
})

//we can create our own methods like checkkpassword 
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.ACCESS_REFRESH_SECRET,
        {
            expiresIn:ACCESS_REFRESH_EXPIRY
        }
    )
}

const User = mongoose.model("User", userSchema)

module.exports = User