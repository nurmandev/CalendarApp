//Taylor Zweigle, 2024
const express = require("express");

const {
  getUsers,
  loginUser,
  registerUser,
  logoutUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);

router.post("/login", loginUser);

router.post("/logOut", logoutUser);

router.post("/register", registerUser);

module.exports = router;
