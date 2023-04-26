const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "product name can't be less than 3 characters"],
    required: true,
  },

  image: {
    type: String,
    default: "product.png",
  },

  quantity: {
    type: String,
    required: true,
  },

  discountPercentage: {
    type: String,
  },

  price: {
    type: Number,
    requred: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    requred: true,
  },

  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },

  featured: {
    type: Boolean,
  },

  topSeller: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Product', productSchema);