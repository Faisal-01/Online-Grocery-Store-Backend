const Category = require("../models/Category");
const Product = require("../models/Product");
const Subcategory = require("../models/Subcategory")

const getAllCategories = async (req, res) => {
  const Categories = await Category.find({});
  res.status(200).json(Categories);
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  const image = req.file.originalname;
  
  const category = await Category.create({ name, image });

  res.status(200).json("Category Added Successfully");
};

const getCategory = async (req, res) => {
  let category = await Category.findById(req.params.id);
  const subcategories = await Promise.all(category.subCategoryList?.map((sub) => {
    return Subcategory.findById(sub);
  }))
  const products = await Promise.all(
    category.productList?.map((product) => {
      return Product.findById(product);
    })
  );
  category = {...category._doc, productList: products, subCategoryList: subcategories}
  res.status(200).json(category);
};

const updateCategory = async (req, res) => {
  const { name, image, subcategoryID } = req.body.category;
  const { id } = req.params;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    {
      name: name,
      image: image,
      $push: {subCategoryList: subcategoryID}
    }
  );
  if (category) {
    res.status(200).send("Category updated Successfully");
  } else {
    res.status(404).send("Category not found. Updation Failed");
  }
};

const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (category) {
    res.status(200).send("Category deleted Successfully");
  } else {
    res.status(404).send("Category not found. Deletion Failed");
  }
};

const subcategoriesOfCategories = async (req, res) => {
  const categories = await Category.find({});
  const categoryProducts = await Promise.all(
    categories.map(async (category) => {

      return {
        _id: category._id,
        name: category.name,
        subcategories: await Promise.all(
          category.subCategoryList.map((subcategory) => {
            return Subcategory.findById(subcategory)
          })
        ),
      };
    })
  );

  res.status(200).json(categoryProducts)
}

const getProductsOfCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  const products = await Promise.all(
    category.productList.map((product) => {
      return Product.findById(product);
    })
  );

  res.status(200).json({ name: category.name, products: products });
};


const searchCategory = async (req, res) => {
  const { query } = req.params;
  const categories = await Category.find({
    name: { $regex: query, $options: "i" },
  });
  res.status(200).json({ query: query, categories: categories });
}

module.exports = {
  getAllCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  subcategoriesOfCategories,
  getProductsOfCategory,
  searchCategory
};
