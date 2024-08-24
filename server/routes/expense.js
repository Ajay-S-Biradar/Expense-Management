const { getExpense, addExpense, deleteExpense } = require('../controllers/expense.controller');
const { verifyJwt } = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.route('/').get(verifyJwt ,getExpense).post(verifyJwt,addExpense).delete(verifyJwt,deleteExpense);

module.exports = router;