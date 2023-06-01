const express = require("express");
const router = express.Router();
const multer = require('multer');

const {getAllRequestedProducts, createRequestedProduct} = require("../controllers/requestedProduct");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/requestedProducts/"); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Set a unique filename for the uploaded file
  },
});
const upload = multer({ storage });


router.get('/', getAllRequestedProducts);
router.post("/", upload.single("file"), createRequestedProduct);

module.exports = router;