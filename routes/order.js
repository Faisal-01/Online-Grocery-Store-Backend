const express = require("express");
const router = express.Router();

const {getAllOrders, getOrder, getOrdersOfUser, createOrder, updateOrder, deleteOrder} = require("../controllers/order");

router.get("/", getAllOrders);
router.get("/:id", getOrder);
router.get("/user/:userId", getOrdersOfUser);
router.post("/", createOrder);
router.patch("/:id", updateOrder);
router.patch("/delete/:id", deleteOrder);

module.exports = router;