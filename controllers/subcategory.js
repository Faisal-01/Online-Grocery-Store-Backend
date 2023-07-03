const Subcategory = require("../models/Subcategory");
const Product = require("../models/Product");
const Category =require("../models/Category");

const getAllSubcategories = async (req, res) => {
  const subcategories = await Subcategory.find({});
  res.status(200).json(subcategories);
};

const createSubcategory = async (req, res) => {
  console.log(req.body, req.file)
  const { name, category } = req.body;
  const image = req.file.originalname;
  const subcategory = await Subcategory.create({ name, image });

  const cat = await Category.findByIdAndUpdate(category, {
    $push: { subCategoryList: subcategory._id },
  });

  res.status(200).json("Subcategory Added Successfully");
};

const getSubcategory = async (req, res) => {
  let subcategory = await Subcategory.findById(req.params.id);
  const products = await Promise.all(
    subcategory.productList?.map((product) => {
      return Product.findById(product);
    })
  );
  subcategory = {
    ...subcategory._doc,
    productList: products,
  };
  res.status(200).json(subcategory);
};

const updateSubcategory = async (req, res) => {
  const { name, image } = req.body.subcategory;
  const { id } = req.params;
  const subcategory = await Subcategory.findOneAndUpdate(
    { _id: id },
    {
      name: name,
      image: image,
    }
  );
  if (subcategory) {
    res.status(200).send("Subcategory updated Successfully");
  } else {
    res.status(404).send("Subcategory not found. Updation Failed");
  }
};

const deleteSubcategory = async (req, res) => {
  const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
  if (subcategory) {
    res.status(200).send("Subcategory deleted Successfully");
  } else {
    res.status(404).send("Subcategory not found. Deletion Failed");
  }
};

const getSubcategoryOfCategory = async (req, res) => {
  const {id} = req.params;
  const category = await Category.findById(id);
  const subcategories = await Promise.all(
    category.subCategoryList.map((sub) => {
      return Subcategory.findById(sub._id);
    })
  );

  res.status(200).json(subcategories)
}

const getProductsOfSubcategories = async (req, res) => {
  const subcategory = await Subcategory.find({});
  const subcategoryProducts = await Promise.all(
    subcategory.map(async (subcategory) => {
      return {
        title: subcategory.name,
        products: await Promise.all(
          subcategory.productList.map((product) => {
            return Product.findById(product);
          })
        ),
      };
    })
  );
  res.status(200).json(subcategoryProducts);
};

const getProductsOfSubcategory = async (req, res) => {
  const {id} = req.params;
  const subcategory = await Subcategory.findById(id);
  const products = await Promise.all(
    subcategory.productList.map((product) => {
      return Product.findById(product);
    })
  )

  res.status(200).json({name: subcategory.name,products: products});
}


const searchSubcategory = async (req, res) => {
  const { query } = req.params;
  const subcategories = await Subcategory.find({
    name: { $regex: query, $options: "i" },
  });
  res.status(200).json({ query: query, subcategories: subcategories });
};

module.exports = {
  getAllSubcategories,
  createSubcategory,
  getSubcategory,
  updateSubcategory,
  getSubcategoryOfCategory,
  deleteSubcategory,
  getProductsOfSubcategories,
  getProductsOfSubcategory,
  searchSubcategory
};
