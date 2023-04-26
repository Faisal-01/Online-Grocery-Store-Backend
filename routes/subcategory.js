const express = require("express");
const router = express.Router();
const {
  getAllSubcategories,
  createSubcategory,
  getSubcategory,
  updateSubcategory,
  getSubcategoryOfCategory,
  deleteSubcategory,
} = require("../controllers/Subcategory");

router.get("/", getAllSubcategories);
router.post("/", createSubcategory);
router.get("/:id", getSubcategory);
router.patch("/:id", updateSubcategory);
router.get("/subcategories/:id", getSubcategoryOfCategory);
router.delete("/:id", deleteSubcategory);

module.exports = router;
