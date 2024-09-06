const router = require('express').Router();
const { getIncomeGraphData, getPieChartData } = require('../controllers/dashboard.controller');
const { verifyJwt } = require('../middlewares/auth.middleware');

router.route('/line').get(verifyJwt, getIncomeGraphData);
router.route('/pie').get(verifyJwt, getPieChartData);

module.exports = router;