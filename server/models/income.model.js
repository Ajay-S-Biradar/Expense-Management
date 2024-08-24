const mongoose = require("mongoose")

const incomeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    reference:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Income =mongoose.model("income", incomeSchema);

module.exports = Income