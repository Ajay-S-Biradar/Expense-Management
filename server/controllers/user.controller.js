const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const generateAccessAndRefreshToken = async(user)=>{
    const aToken =await user.generateAccessToken()
    const rToken =await user.generateRefreshToken()

    user.refreshToken = rToken ;
    await user.save({ validateBeforeSave: false })

    return {aToken, rToken}
}


const createUser = asyncHandler( async (req,res)=>{
    const {username, password, email, profileImg} = req.body;
    console.log(req.body);
    try {
        var user;
        if(profileImg){
            user = await User.create({
                username,
                password,
                email,
                profileImg
            }) 
        }
        else{
            user = await User.create({
                username,
                password,
                email
            })    
        }
        console.log(user);
        res.json({"success":true})
    } catch (error) {
        res.json({"error":error})
    }
})

const authenticateUser = asyncHandler(async (req,res)=>{
    const {password, email, username} = req.body;
    try{
        const user = await User.findOne({$or:[{username},{email}]});
        console.log(user);
        if(!user){
            res.json({"success":false, "msg":"Email is not registered", "redirect":true});
            return;
        }
        
        if(!user.isPasswordCorrect(password)){
            res.json({"success":false, "msg":"Password and email does'nt match", "redirect":false});
            return;
        }
        const {aToken,rToken} = await generateAccessAndRefreshToken(user)

        const loggedUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly:true,
            // secure:true
        }

        res.status(200)
        .cookie("accessToken", aToken, options)
        .cookie("refreshToken", rToken, options)
        .json(loggedUser)

    } catch (err){
        res.json({"error":err})
    }
})

const signOutUser = asyncHandler( async (req,res)=>{
    console.log(req.user);
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        // secure: false 
        //make true for the production
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({"success":true})
})

const refreshAccessToken = asyncHandler( async (req,res)=>{
    const Token = req.cookies.refreshToken ;
    if(!Token){
        res.json({"error":"No token"});
        return ;
    }
    const decoded = jwt.verify(Token, process.env.REFRESH_TOKEN_SECRET)

    if(!decoded){
        res.status(401).json({"error":"Anauthorised Access"})
        return ;
    }
    const user = await User.findById(decoded?._id);
    if(!user){
        res.status(401).json({"error":"Invalid token"})
        return ;
    }
    const options = {
        httpOnly:true,
        // secure:true
    }
    const {rToken, aToken} = await generateAccessAndRefreshToken(user)
    res.status(200)
    .cookie("accessToken",aToken,options)
    .cookie("refreshToken",rToken,options)
    .json({"success":true})
})

module.exports = {authenticateUser, createUser, signOutUser, refreshAccessToken}