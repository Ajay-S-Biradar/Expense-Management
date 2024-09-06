const asyncHandler = require("express-async-handler");
const Expense = require("../models/expense.model");
const mongoose = require("mongoose");

const addExpense = asyncHandler( async (req, res)=>{
    const {name, amount, category, date, reference} = req.body;
    const owner = req.user?._id.toString();
    console.log(req.body);

    try {
        const addedExpense = await Expense.create({
            name,
            amount,
            category,
            date,
            reference,
            owner
        })
        res.json({"success":true,"addedExpense":addedExpense})
    } catch (error) {
        res.status(401).json({"error":error})
    }
})

const getExpense = asyncHandler(async (req, res) => {
    const userId = req.user._id.toString();
    console.log({"expense":userId});
    try {
        const expenses = await Expense.find({ owner: userId });
        console.log(expenses);
        res.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error); // Log the error to the console
        res.status(400).json({ success: false, error: error.message || 'Something went wrong' });
    }
    // res.send("test");
});

const deleteExpense = asyncHandler (async (req, res)=>{
    const {incomeId} = req.body;
    const userId = req.user?._id.toString();
    try {
        await Expense.deleteOne({$and:[{_id: incomeId},{owner: userId}]})
        res.json({"success":true})
    } catch (error) {
        res.status(400).json({"error":error});
    }
})

const getBarGraphData = asyncHandler( async (req,res)=>{
    const owner = req.user?._id.toString();
    // console.log(userId);
    try {
        const data = await Expense.aggregate([
            {$match :{owner: new mongoose.Types.ObjectId(owner)}},
            {
                $group: {
                  _id: { 
                    year: { $year: "$date" }, 
                    category: "$category" 
                  },
                  totalAmount: { $sum: "$amount" }
                }
              },
              { 
                $sort: { 
                  "_id.year": 1,        
                  "_id.category": 1     
                } 
              },
              {
                $group: {
                  _id: "$_id.year",
                  categories: {
                    $push: { 
                      category: "$_id.category", 
                      totalAmount: "$totalAmount" 
                    }
                  }
                }
              },
              { 
                $sort: { 
                  "_id": -1            
                } 
              },
              {
                $project: {
                  _id: 0,
                  year: "$_id",
                  categories: 1
                }
              }
        ])
        console.log(data);
        res.json(data);
    } catch (error) {
        console.log({"error in getbargarphdata :":error});
        res.status(400).json({"error":"Error while fetching the data."});
    }
})

module.exports = { addExpense, getExpense, deleteExpense, getBarGraphData }