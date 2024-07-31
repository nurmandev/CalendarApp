// controllers/userController.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable must be defined");
}

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET, {});
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.register(username, password);
    const token = createToken(user._id);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = (req, res) => {
  try {
    // Invalidate the token on the client side by deleting it from storage
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to logout" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

module.exports = {
  getUsers,
  loginUser,
  registerUser,
  logoutUser,
  getUserById,
};
