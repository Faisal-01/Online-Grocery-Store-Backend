const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAllSubcategories,
  createSubcategory,
  getSubcategory,
  updateSubcategory,
  getSubcategoryOfCategory,
  deleteSubcategory,
  getProductsOfSubcategories,
  getProductsOfSubcategory,
  searchSubcategory
} = require("../controllers/Subcategory");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/subcategories/"); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    file.originalname = Date.now() + "-" + file.originalname;
    cb(null, file.originalname); // Set a unique filename for the uploaded file
  },
});
const upload = multer({ storage });

router.get("/", getAllSubcategories);
router.post("/", upload.single("file"), createSubcategory);
router.get("/all", getProductsOfSubcategories);
router.get("/subcategories/:id", getSubcategoryOfCategory);
router.get("/search/:query", searchSubcategory);
router.get("/:id", getSubcategory);
router.get('/:id/products', getProductsOfSubcategory);
router.patch("/:id", updateSubcategory);
router.delete("/:id", deleteSubcategory);

module.exports = router;
