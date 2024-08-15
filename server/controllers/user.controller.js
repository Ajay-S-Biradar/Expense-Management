const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')


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
    const {password, email} = req.body;
    try{
        const user = await User.findOne({email});
        console.log(user);
        if(!user){
            res.json({"success":false, "msg":"Email is not registered", "redirect":true});
        }
        if(user.password!==password){
            res.json({"success":false, "msg":"Password and email does'nt match", "redirect":false});
        }
        res.json({"success":true, "user":user})

    } catch (err){
        res.json({"error":err})
    }
})

module.exports = {authenticateUser, createUser}