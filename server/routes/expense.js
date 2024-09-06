const { getExpense, addExpense, deleteExpense, getBarGraphData } = require('../controllers/expense.controller');
const { verifyJwt } = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.route('/').get(verifyJwt ,getExpense).post(verifyJwt,addExpense).delete(verifyJwt,deleteExpense);
router.route('/graph/bar').get(verifyJwt, getBarGraphData);

module.exports = router;