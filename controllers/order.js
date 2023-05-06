const Order = require("../models/Order");
const User = require("../models/User");

const getAllOrders = async (req, res) => {
    const orders  = await Order.find({});
    res.status(200).json(orders);
}

const getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
}

const getOrdersOfUser = async (req, res) => {
    const {userId} = req.params;
    const user = await User.findById(userId);
    const orders = await Promise.all(user.orderList.map((orderId) => {
        return Order.findById(orderId);
    }))

    res.status(200).json(orders);
}

const createOrder = async (req, res) => {
    const order = await Order.create(req.body);
    res.status.json(order);
}

const updateOrder = async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(order);
}

const deleteOrder = async (req, res) => {
    const {id} = req.params;
    const order = await Order.findByIdAndDelete(id);
    res.status(200).json(order);
}

module.exports = {getAllOrders, getOrder, getOrdersOfUser, createOrder, updateOrder, deleteOrder}