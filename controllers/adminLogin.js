const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Please Enter Email and password");
    return
  }
  if (email !== "faisaliqbal012@gmail.com" || password !== "faisal") {
    res.status(400).send("Wrong Credentials");
    return;
  }

  const token = jwt.sign({ id: "Admin" }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ token: token, message: "Login Success" });
};

module.exports = login