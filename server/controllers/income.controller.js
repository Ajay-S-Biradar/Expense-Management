const asyncHandler = require("express-async-handler");
const Income = require("../models/income.model");
const mongoose = require("mongoose");

const addIncome = asyncHandler( async (req, res)=>{
    const {name, amount, category, date, reference} = req.body;
    const owner = req.user?._id.toString();
    // console.log(req.body);

    try {
        const addedIncome = await Income.create({
            name,
            amount,
            category,
            date,
            reference,
            owner
        })
        res.json({"success":true,"addedIncome":addedIncome})
    } catch (error) {
        res.status(401).json({"error":error})
    }
})

const getIncome = asyncHandler(async (req, res) => {
    const userId = req.user._id.toString();
    // console.log({"income":userId});
    try {
        const incomes = await Income.find({ owner: userId }).sort({date:-1}) ;
        // console.log(incomes);
        res.json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error); // Log the error to the console
        res.status(400).json({ success: false, error: error.message || 'Something went wrong' });
    }
    // res.send("test");
});

const deleteIncome = asyncHandler (async (req, res)=>{
    const {id} = (req.params);
    const userId = req.user?._id.toString();
    try {
        await Income.deleteOne({$and:[{_id: id},{owner: userId}]})
        res.json({"success":true})
    } catch (error) {
        res.status(400).json({"error":error});
    }
})

const getBarGraphData = asyncHandler( async (req,res)=>{
    const owner = req.user?._id.toString();
    // console.log(userId);
    try {
        const data = await Income.aggregate([
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

module.exports = { addIncome, getIncome, deleteIncome, getBarGraphData }