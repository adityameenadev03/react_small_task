const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

router.post("/loginUser", loginUser);
router.post("/signupUser", signupUser);

module.exports = router;
