const User = require('../models/User');

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
}

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const {firstName, lastName, password} = req.body;
    if(password)
    {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        const user = await User.findByIdAndUpdate(id, {$set: {firstName: firstName, lastName: lastName, password: hashpassword}})
        res.status(200).json(user);
    }
    else{
        const user = await User.findByIdAndUpdate(id, {
          $set: {
            firstName: firstName,
            lastName: lastName
          },
        });
        res.status(200).json(user);

    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({message: 'User deleted'});
}


module.exports = {getAllUsers, getUser, updateUser, deleteUser}