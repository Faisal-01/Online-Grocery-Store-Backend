// const Product = require('../models/Product');
// const data = require('../data');

// // const createDatabaseOfProducts = async (req, res) => {
// //     // await Product.insertMany(data);
// //     // console.log(data);
// //     await Product.deleteMany({});
// //     const products = await Product.insertMany(data);
// //     res.send(products);
// // }

// const getAllProducts = async (req, res) => {
//     const products = await Product.find({});
//     res.json(products);
// }

// const getProducts = async (req, res) => {
//     const categories = await Product.find({}).distinct('product');
//     categories.map((product) => {
//         return {
//             image: ``
//         }
//     })
//     res.status(200).json(categories);
// }

const Product = require("../models/Product");
const data = require("../data");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

const getAllProducts = async (req, res) => {
//   const Products = await Product.find({});
//   res.status(200).json(Products);
    const result = await Product.deleteMany({});
    res.json(result);
};

const createProduct = async (req, res) => {
//   const { name, image, quantity, discountPercentage, price, categoryID, subcategoryID, featured, topSeller } = req.body;
//   const product = await Product.create({
//     name,
//     image,
//     quantity,
//     discountPercentage,
//     price,
//     category,
//     subcategory,
//     featured,
//     topSeller,
//   });

//   res.status(200).json(product);
    const {categoryName, subcategoryName, categoryID, subcategoryID} = req.body;

    const result = Promise.all(data.map( async (product) => {
        if (product.category === categoryName) {
          if (product.subcategory === subcategoryName) {
            // console.log(product);


            const addedProduct = await Product.create({
              name: product.name,
              image: product.image,
              quantity: product.quantity,
              discountPercentage: product.discountPercentage,
              price: product.price,
              category: categoryID,
              subcategory: subcategoryID,
              featured: product.featured,
              topSeller: product.topSeller,
            });
            console.log(addedProduct)

            const category = await Category.findByIdAndUpdate(categoryID, {
              $push: { productList: addedProduct._id },
            });

            const subcategory = await Subcategory.findByIdAndUpdate(
              subcategoryID,
              {
                $push: { productList: addedProduct._id },
              }
            );


          }
        }
    }))
    res.send("success");
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { name, image } = req.body;
  const { id } = req.params;
  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      name: name,
      image: image,
    }
  );
  if (product) {
    res.status(200).send("Product updated Successfully");
  } else {
    res.status(404).send("Product not found. Updation Failed");
  }
};

const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (product) {
    res.status(200).send("Product deleted Successfully");
  } else {
    res.status(404).send("Product not found. Deletion Failed");
  }
};

const getFeaturedProducts = async (req, res) => {
  const products = await Product.find({ featured: true });
  res.status(200).json(products);
};

const getTopSellerProducts = async (req, res) => {
  const products = await Product.find({ topSeller: true });
  res.status(200).json(products);
};

const getCustomProducts = async (req, res) => {
  const categories = await Product.find({}).distinct("");
  const categoriesProducts = await Promise.all(
    categories.map(async (product) => {
      return {
        title: product,
        products: await Product.find({ product: product }),
      };
    })
  );
  res.status(200).json(categoriesProducts);
};


module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getTopSellerProducts,
  getCustomProducts,
};
