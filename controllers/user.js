const User = require('../models/User');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
}

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
}

const getUserFromToken = async (req, res) => {
    const header = req.headers.authorization;
    if(!header || !header.startsWith("Bearer "))
    {
       
        res.status(401).json("Not Authorized")
        return
    }
    else{
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id)
        res.status(200).send({id: user._id, firstName: user.firstName,  lastName: user.lastName, email: user.email, phoneNumber: user.phoneNumber});
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const {firstName, lastName, password, phoneNumber} = req.body.user;
    if(password)
    {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        const user = await User.findByIdAndUpdate(id, {$set: {firstName: firstName, lastName: lastName, password: hashpassword, phoneNumber}})
        res.status(200).json(user);
    }
    else{
        const user = await User.findByIdAndUpdate(id, {
          $set: {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
          },
        });
        res.status(200).json(user);

    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({message: 'User deleted Successfully'});
}

const searchUser = async (req, res) => {
    const {search} = req.body;
    const result = await User.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } }, // Case-insensitive search on field1
        { lastName: { $regex: search, $options: "i" } }, // Case-insensitive search on field2
        { email: { $regex: search, $options: "i" } }, // Case-insensitive search on field3
        // Add more fields as needed
      ],
    });

    res.status(200).json(result);
}


module.exports = {
  getAllUsers,
  getUser,
  getUserFromToken, 
  updateUser,
  deleteUser,
  searchUser
};