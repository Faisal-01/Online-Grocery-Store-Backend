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
const multer = require("multer");

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/products/"); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    file.originalname = Date.now() + "-" + file.originalname
    cb(null, file.originalname); // Set a unique filename for the uploaded file
  },
});
const upload = multer({ storage });

router.get("/", getAllProducts);
router.post("/", upload.single("file"), createProduct);
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