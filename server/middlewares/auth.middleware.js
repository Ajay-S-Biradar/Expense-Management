const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const User = require("../models/user.model");

const verifyJwt = asyncHandler( async (req, res, next)=>{
    console.log("Jwtverify");
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        console.log("jwt", token);
        if(!token){
            res.status(400).json("Token is undefined")
            return;
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        const user = await User.findById(decodedToken?._id).select(" -password -refreshToken")
        if(!user){
            res.status(401).json("There is no user")
            return ;
        }
        console.log({"jwt user":user})
        req.user = user
        next()
    } catch (error) {
        res.json({"error":error})
    }
})

module.exports = {verifyJwt}