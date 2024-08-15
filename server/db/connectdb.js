const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connection success")
    } catch (err){
        console.log("Mongo connection: ",err);
    }
}

module.exports = {connectDB}