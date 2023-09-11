const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_KEY, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.login(email, password);
    const { name } = user;
    // create a Token
    const token = createToken(user._id);
    res.status(200).json({ name, email, token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: "error", message: error.message });
  }
};
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    // using the userSchema static method
    const user = await User.signup(name, email, password);
    console.log(user);

    // create a Token
    const token = createToken(user._id);

    res.status(200).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = { loginUser, signupUser };
