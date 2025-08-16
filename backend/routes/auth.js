const express = require("express");
const { signup, signin } = require("../controllers/auth");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
