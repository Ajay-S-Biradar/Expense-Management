const asyncHandler = require("express-async-handler");
const Income = require('../models/income.model');
const Expense = require('../models/expense.model');
const mongoose = require("mongoose");

const getIncomeGraphData = asyncHandler(async (req, res) => {
    const owner = req.user?._id.toString();

    try {
        const dataExpense = await Expense.aggregate([
            { $match: { owner:new mongoose.Types.ObjectId(owner) } }, // Corrected $match filter
            {
                $group: {
                    _id: { year: { $year: "$date" }, month: { $month: "$date" } }, // Group by year and month
                    totalIncome: { $sum: "$amount" }, // Sum the amounts
                },
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    totalIncome: 1,
                },
            },
            { $sort: { year: -1, month: 1 } }
        ]);
        const dataIncome = await Income.aggregate([
            { $match: { owner:new mongoose.Types.ObjectId(owner) } }, // Corrected $match filter
            {
                $group: {
                    _id: { year: { $year: "$date" }, month: { $month: "$date" } }, // Group by year and month
                    totalIncome: { $sum: "$amount" }, // Sum the amounts
                },
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    totalIncome: 1,
                },
            },
            { $sort: { year: -1, month: 1 } }
        ]);
        res.json({ dataIncome,dataExpense});
    } catch (err) {
        console.log("Dashboard error: ", err);
        res.status(500).json({ message: "Server error" });
    }
});

const getPieChartData =asyncHandler (async (req,res)=>{
    const owner = req.user?._id.toString();

    // const dataIncome = await Income.aggregate([
    //     { $match: {owner: new mongoose.Types.ObjectId(owner)} },
    //     {
    //         $group:{
    //             _id:{ year: {$year:"$date"}},
    //             totalAmount: {$sum : "$amount"}
    //         }
    //     },
    //     {$sort : {year:-1}}
    // ])
    // const dataExpense = await Expense.aggregate([
    //     { $match: {owner: new mongoose.Types.ObjectId(owner)} },
    //     {
    //         $group:{
    //             _id:{ year: {$year:"$date"}},
    //             totalAmount: {$sum : "$amount"}
    //         }
    //     },
    //     {$sort : {year:-1}}
    // ])

    const totIncomeData = await Income.aggregate([
        { $match: {owner: new mongoose.Types.ObjectId(owner)} },
        { $group:{
            _id: {owner:new mongoose.Types.ObjectId(owner)},
            totalAmount: {$sum : "$amount"}
        } }
    ])
    const totExpenseData = await Expense.aggregate([
        { $match: {owner: new mongoose.Types.ObjectId(owner)} },
        { $group:{
            _id: {owner:new mongoose.Types.ObjectId(owner)},
            totalAmount: {$sum : "$amount"}
        }}
    ])
    res.json({income:totIncomeData, expense:totExpenseData})
})

module.exports = { getIncomeGraphData, getPieChartData };
