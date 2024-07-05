const express = require("express");

const {
  getUsers,
  loginUser,
  registerUser,
  logoutUser,
  addUserCalendarDetails,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);

router.post("/login", loginUser);

router.post("/logOut", logoutUser);

router.post("/register", registerUser);

router.post('/calendar', addUserCalendarDetails);

module.exports = router;
