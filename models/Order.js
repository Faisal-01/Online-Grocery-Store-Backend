const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    orderStatus: {
      type: String,
      enum: ["Active", "Delivered", "Cancelled"],
      default: "Active",
    },

    orderAmount: {
      type: Number,
      required: true,
    },

    shippingAddress: {
      type: String,
      required: true,
    },

    method: {
      type: String,
      emun: ["COD", "Card"],
      default: "COD"
    },

    productList: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        productPrice: {
          type: Number,
          required: true,
        },

        productDiscount: {
          type: Number,
        },

        productQuantity: {
          type: Number,
          required: true,
        }
      },
    ],
    // required: true,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
