const express = require("express");
const router = express.Router();
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

router.get("/", getAllSubcategories);
router.post("/", createSubcategory);
router.get("/all", getProductsOfSubcategories);
router.get("/subcategories/:id", getSubcategoryOfCategory);
router.get("/search/:query", searchSubcategory);
router.get("/:id", getSubcategory);
router.get('/:id/products', getProductsOfSubcategory);
router.patch("/:id", updateSubcategory);
router.delete("/:id", deleteSubcategory);

module.exports = router;
