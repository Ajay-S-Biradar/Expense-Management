const { createUser, authenticateUser } = require("../controllers/user.controller");

const router = require("express").Router();

router.route('/signup').post(createUser)
router.route('/signin').post(authenticateUser)

module.exports = router