const asyncHandler = require("express-async-handler");
const Expense = require("../models/expense.model");

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

module.exports = { addExpense, getExpense, deleteExpense }