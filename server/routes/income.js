const { addIncome, getIncome, deleteIncome } = require("../controllers/income.controller")
const { verifyJwt } = require("../middlewares/auth.middleware")

const router = require("express").Router()

router.route('/').get(verifyJwt ,getIncome).post(verifyJwt, addIncome)
router.route('/:id').delete(verifyJwt, deleteIncome)

module.exports = router