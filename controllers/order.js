const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json(orders);
};

const getOrder = async (req, res) => {
  // if(mongoose.mongoose.Types.ObjectId.isValid(req.params.id))
  let order = await Order.findById(req.params.id);
  order = {
    ...order?._doc,
    productList: await Promise.all(
      order.productList.map(async (product) => {
        return {
          ...product?._doc,
          product: await Product.findById(product.productId),
        };
      })
    ),
  };

  res.status(200).json(order);
};

const getOrdersOfUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  

  let orders = await Promise.all(
    user.orderList.map((orderId) => {
      return Order.findById(orderId);
    })
  );
  orders = await Promise.all(
    orders.map(async (order) => {
      return {
        ...order._doc,
        productList: await Promise.all(
          order.productList.map(async (product) => {
            return {
              ...product._doc,
              product: await Product.findById(product.productId),
            };
          })
        ),
      };
    })
  );

  res.status(200).json(orders);
};

const createOrder = async (req, res) => {
  const { orderBy, productList, orderAmount, shippingAddress, method } = req.body;
  
  const order = await Order.create({
    orderBy,
    productList,
    orderAmount,
    shippingAddress,
    method
  });

  const user = await User.findByIdAndUpdate(orderBy, {
    $push: { orderList: order._id },
  });
  res.status(200).json(order);
};

const updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body.order);
  res.status(200).json("Order Updated Successfully");
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const {userId} = req.body;
  const order = await Order.findByIdAndDelete(id);
  const user = await User.findByIdAndUpdate(userId, {
    $pull: { orderList: order._id },
  });
  res.status(200).json("Order Deleted Successfully");
};

module.exports = {
  getAllOrders,
  getOrder,
  getOrdersOfUser,
  createOrder,
  updateOrder,
  deleteOrder,
};
