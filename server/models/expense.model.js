const mongoose = require("mongoose")
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const expenseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Expense =mongoose.model("Expense", expenseSchema)

mySchema.plugin(aggregatePaginate)

module.exports = Expense