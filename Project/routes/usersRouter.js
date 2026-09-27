const express = require("express");
const userModel = require("../models/user-model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const { registerUser, loginUser } = require("../controllers/authController");

router.get("/", function (req, res) {
  res.send("Hey its working");
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
