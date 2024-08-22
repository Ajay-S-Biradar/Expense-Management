const asyncHandler = require("express-async-handler");
const Income = require("../models/income.model");

const addIncome = asyncHandler( async (req, res)=>{
    const {name, amount, category, date} = req.body;
    const owner = req.user?._id.toString();
    console.log(req.body);

    try {
        const addedIncome = await Income.create({
            name,
            amount,
            category,
            date,
            owner
        })
        res.json({"success":true,"addedIncome":addedIncome})
    } catch (error) {
        res.status(401).json({"error":error})
    }
})

const getIncome = asyncHandler(async (req, res) => {
    const userId = req.user._id.toString();
    console.log({"income":userId});
    try {
        const incomes = await Income.find({ owner: userId });
        console.log(incomes);
        res.json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error); // Log the error to the console
        res.status(400).json({ success: false, error: error.message || 'Something went wrong' });
    }
    // res.send("test");
});

const deleteIncome = asyncHandler (async (req, res)=>{
    const {incomeId} = req.body;
    const userId = req.user?._id.toString();
    try {
        await Income.deleteOne({$and:[{_id: incomeId},{owner: userId}]})
        res.json({"success":true})
    } catch (error) {
        res.status(400).json({"error":error});
    }
})

module.exports = { addIncome, getIncome, deleteIncome }