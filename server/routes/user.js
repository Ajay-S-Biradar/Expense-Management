const { createUser, authenticateUser, signOutUser, refreshAccessToken } = require("../controllers/user.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.route('/signup').post(createUser)
router.route('/signin').post(authenticateUser)

//secured routes - means the routes that pass through the middleware

router.route('/signout').post(verifyJwt, signOutUser)
router.route('/refresh').post(refreshAccessToken)

module.exports = router