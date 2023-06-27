const Product = require("../models/Product");
const data = require("../data");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

const getAllProducts = async (req, res) => {
  const Products = await Product.find({});
  res.status(200).json(Products);
};

const deleteAllProduct = async (req, res) => {
  const result = await Product.deleteMany({});
  res.json(result);
};

const createProduct = async (req, res) => {
  const {
    name,
    image,
    quantity,
    discountPercentage,
    price,
    category,
    subcategory,
    featured,
    topSeller,
  } = req.body;

  const product = await Product.create({
    name,
    image: req.file.originalname,
    quantity,
    discountPercentage,
    price,
    category,
    subcategory,
    featured,
    topSeller,
  });

  const cat = await Category.findByIdAndUpdate(category, {
    $push: { productList: product._id },
  });

  const subcat = await Subcategory.findByIdAndUpdate(subcategory, {
    $push: { productList: product._id },
  });


  res.status(200).json("Product Added Successfully");
  // const {categoryName, subcategoryName, categoryID, subcategoryID} = req.body;

  // const result = await Promise.all(data.map( async (product) => {
  //     if (product.category === categoryName) {
  //       if (product.subcategory === subcategoryName) {

  //         const addedProduct = await Product.create({
  //           name: product.name,
  //           image: product.image,
  //           quantity: product.quantity,
  //           discountPercentage: product.discountPercentage,
  //           price: product.price,
  //           category: categoryID,
  //           subcategory: subcategoryID,
  //           featured: product.featured,
  //           topSeller: product.topSeller,
  //         });
  //         console.log(addedProduct)

  //         const category = await Category.findByIdAndUpdate(categoryID, {
  //           $push: { productList: addedProduct._id },
  //         });

  //         const subcategory = await Subcategory.findByIdAndUpdate(
  //           subcategoryID,
  //           {
  //             $push: { productList: addedProduct._id },
  //           }
  //         );

  //       }
  //     }
  // }))
  // res.send("success");
};

const getProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.category = await Category.findById(product.category);
  product.subcategory = await Subcategory.findById(product.subcategory);
  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {product} = req.body
  const response = await Product.findOneAndUpdate(
    { _id: id },
    {
      name: product.name,
      quantity: product.quantity,
      discountPercentage: product.discountPercentage,
      price: product.price,
      category: product.category._id,
      subcategory: product.subcategory._id,
      featured: product.featured,
      topSeller: product.topSeller,
    
    }
  );
  if (response) {
    res.status(200).send("Product updated Successfully");
  } else {
    res.status(404).send("Product not found. Updation Failed");
  }
};

const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (product) {
    const cat = await Category.findByIdAndUpdate(product.category, {
      $pull: { productList: product._id },
    });

    const subcat = await Subcategory.findByIdAndUpdate(product.subcategory, {
      $pull: { productList: product._id },
    });
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
  const categories = await Category.find({})
  const categoriesProducts = await Promise.all(
    categories.map(async (category) => {
      return {
        title: category.name,
        products: await Promise.all(
          category.productList.map( (product) => {
            return  Product.findById(product);
          })
        ),
      };
    })
  );
  res.status(200).json(categoriesProducts);
};

const similarProducts = async (req, res) => {
  const {id} = req.params;
  const product = await Product.findById(id);
  const subcategory = await Subcategory.findById(product.subcategory);
  let products = await Promise.all(subcategory.productList.map((product) => {
    if(product != id)
    {
      return Product.findById(product)
    }
  }))

  products = products.filter(product => product !== undefined);

  res.status(200).json({subcategory: subcategory.name, products: products});

}

const searchProduct = async (req, res) => {
  const {query} = req.params;
  const products = await Product.find({name: {$regex: query, $options: 'i'}})
  res.status(200).json({query: query, products: products});

  

}

const getProductsMultiple = async (req, res) => {
  const {items} = req.body;

  let products = await Promise.all(
    items.map((item) => {
      return Product.findById(item);
    })
  )

  products = products.map(product => {
    return {
      product: product,
      quantity: 1
    }
  })

  res.status(200).json(products);
}

module.exports = {
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
};
