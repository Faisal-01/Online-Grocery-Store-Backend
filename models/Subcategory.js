const mongoose = require("mongoose");

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  productList: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },

});

module.exports = mongoose.model("Subcategory", SubcategorySchema);
