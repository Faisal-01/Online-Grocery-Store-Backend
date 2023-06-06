const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: [20, "First Name cannot be bigger than 20 characters"],
    minLength: [3, "First Name cannot be less than 3 characters"],
  },

  lastName: {
    type: String,
    required: true,
    maxLength: [20, "Last Name cannot be bigger than 20 characters"],
    minLength: [3, "Last Name cannot be less than 3 characters"],
  },

  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
  },

  password: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
  },

  orderList: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    }],
  },
});

module.exports = mongoose.model("User", UserSchema);