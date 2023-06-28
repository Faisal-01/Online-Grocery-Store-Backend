const express = require("express");
const router = express.Router();
const multer = require("multer")
const {
  getAllCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  subcategoriesOfCategories,
  getProductsOfCategory,
  searchCategory
} = require("../controllers/category");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/categories/"); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    file.originalname = Date.now() + "-" + file.originalname;
    cb(null, file.originalname); // Set a unique filename for the uploaded file
  },
});
const upload = multer({ storage });

router.get('/', getAllCategories);
router.post('/', upload.single("file"), createCategory);
router.get("/subcategories", subcategoriesOfCategories);
router.get("/search/:query", searchCategory);
router.get("/:id/products", getProductsOfCategory);
router.get('/:id', getCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;