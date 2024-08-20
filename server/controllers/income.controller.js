const asyncHandler = require("express-async-handler");
const Income = require("../models/income.model");

const addIncome = asyncHandler( async (req, res)=>{
    const {name, amount, category, date, owner} = req.body ;
    console.log(req.body);

    try {
        await Income.create({
            name,
            amount,
            category,
            date,
            owner
        })
        req.json({"success":true})
    } catch (error) {
        res.status(401).json({"error":"Error while adding the income."})
    }
})