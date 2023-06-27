const RequestedProduct = require("../models/RequestedProduct");
const User = require("../models/User");

const getAllRequestedProducts = async (req, res) => {
    let products = await RequestedProduct.find({});
    products = await Promise.all(products.map(async (product) => {
        product.requestedBy = await User.findById(product.requestedBy)
        return product
    }))
    res.status(200).json(products)
}

const createRequestedProduct = async (req, res) => {
    const {name, manufacturerName, requestedBy} = req.body;
    await RequestedProduct.create({name, manufacturerName, image: req.file.originalname, requestedBy});
    
    if (req.file) {
        res.status(200).send("Product Requested Successfully");
    //   res.json({ message: "File uploaded successfully" });
    } else {
      res.status(400).json({ message: "No file selected" });
    }
}

const deleteRequestedProduct = async (req, res) => {
    const {id} = req.params;
    await RequestedProduct.findByIdAndDelete(id);
    res.status(200).send("Product Deleted Successfully");

}

module.exports = {
  getAllRequestedProducts,
  createRequestedProduct,
  deleteRequestedProduct,
};