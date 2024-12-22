const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const loginWithGoogleApi = require("./loginWithGoogle");
const userApi = require("./user");
const logout = require("./logout");
const train = require("./train");
const payment = require("./payment");

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(loginWithGoogleApi);
router.use(userApi);
router.use(logout);
router.use(train);
router.use(payment);

module.exports = router;
