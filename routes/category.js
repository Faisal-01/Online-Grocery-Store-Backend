const express = require("express");
const router = express.Router();
const {getAllCategories, createCategory, getCategory, updateCategory, deleteCategory} = require('../controllers/category')

router.get('/', getAllCategories);
router.post('/', createCategory);
router.get('/:id', getCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;