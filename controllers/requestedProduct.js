const RequestedProduct = require("../models/RequestedProduct");

const getAllRequestedProducts = async (req, res) => {
    const products = await RequestedProduct.find({});
    res.status(200).json(products)
}

const createRequestedProduct = async (req, res) => {
    
    const {name, manufacturerName} = req.body;
    await RequestedProduct.create({name, manufacturerName, image: req.file.originalname});
    
    if (req.file) {
        res.status(200).send("Product Requested Successfully");
    //   res.json({ message: "File uploaded successfully" });
    } else {
      res.status(400).json({ message: "No file selected" });
    }
}

module.exports = {getAllRequestedProducts, createRequestedProduct}