const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const User = require("../models/user.model");

const verifyJwt = asyncHandler( async (req, res, next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        console.log("jwt", token);
        if(!token){
            throw new Error("Token is undefined")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            throw new Error("There is no user")
        }
        req.user = user
        next()
    } catch (error) {
        res.json({"error":error})
    }
})

module.exports = {verifyJwt}