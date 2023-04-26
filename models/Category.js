const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    productList: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        ],
    },

    subCategoryList: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SubCategory'
            }
        ],
    }
})

module.exports = mongoose.model("Category", CategorySchema);