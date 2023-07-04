const express = require("express");
const router = express.Router();

const login = require("../controllers/adminLogin");

router.post("/", login);

module.exports = router;
