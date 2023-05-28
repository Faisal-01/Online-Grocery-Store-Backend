const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {

    const {email, password} = req.body;
    if(!email || !password){
      res.status(400).send("Please Enter Email and password");

    }
    const user = await User.findOne({ email: req.body.email });
    if(!user){

      res.status(404).send("User doesn't exists");
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
      res.status(400).send("Password is incorrect");
      return;
    };

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'})

    res.status(200).json({token: token});

};

const register = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.user.password, salt);
    req.body.user.password = hashpassword;
    const user = await User.create(req.body.user);
    res.status(200).json("User Registered Succesfully");

};

module.exports = {login, register};