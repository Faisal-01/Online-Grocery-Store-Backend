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
    },

    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("RequestedProduct", RequestedProductSchema)