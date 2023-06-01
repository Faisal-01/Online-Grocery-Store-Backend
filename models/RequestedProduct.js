const mongoose = require("mongoose");

const RequestedProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    manufacturerName: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("RequestedProduct", RequestedProductSchema)