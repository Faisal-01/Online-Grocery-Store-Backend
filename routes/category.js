const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  subcategoriesOfCategories,
  getProductsOfCategory,
} = require("../controllers/category");

router.get('/', getAllCategories);
router.post('/', createCategory);
router.get("/subcategories", subcategoriesOfCategories);
router.get("/:id/products", getProductsOfCategory);
router.get('/:id', getCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;