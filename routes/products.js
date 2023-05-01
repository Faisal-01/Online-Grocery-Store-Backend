// const express = require('express');
// const {
//   getAllProducts,
//   getFeaturedProducts,
//   getTopSellerProducts,
//   getCustomProducts
//   // createDatabaseOfProducts,
// } = require("../controllers/products");
// const router = express.Router();

// router.get("/", getAllProducts);
// router.get('/featured', getFeaturedProducts);
// router.get('/topseller', getTopSellerProducts);
// router.get('/customcategories', getCustomProducts);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteAllProduct,
  getFeaturedProducts,
  getTopSellerProducts,
  getCustomProducts,
  similarProducts,
  searchProduct,
  getProductsMultiple,
} = require("../controllers/products");

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/featured", getFeaturedProducts);
router.get("/topseller", getTopSellerProducts);
router.get("/customcategories", getCustomProducts);
router.get("/similarproducts/:id", similarProducts);
router.get("/search/:query", searchProduct)
router.post("/multiple", getProductsMultiple);

router.delete("/all", deleteAllProduct);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;