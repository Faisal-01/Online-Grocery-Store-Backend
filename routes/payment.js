const express = require("express");
const router = express.Router();

const {
  createPayment,
  getSessionItems
} = require("../controllers/payment");

router.get("/:sessionId", getSessionItems);
router.post("/", createPayment)


module.exports = router;
