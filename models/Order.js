const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderBy: {
      type: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      
    },

    orderStatus: {
        type: String,
        enum: ['Active', 'Delivered', 'Cancelled'],
        default: "Active"
    },

    productList: {
      type: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);