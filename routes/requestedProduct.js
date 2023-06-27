const express = require("express");
const router = express.Router();
const multer = require('multer');

const {getAllRequestedProducts, createRequestedProduct, deleteRequestedProduct} = require("../controllers/requestedProduct");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/requestedProducts/"); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    file.originalname = Date.now() + "-" + file.originalname;
    cb(null, file.originalname); // Set a unique filename for the uploaded file
  },
});
const upload = multer({ storage });


router.get('/', getAllRequestedProducts);
router.post("/", upload.single("file"), createRequestedProduct);
router.delete("/:id", deleteRequestedProduct);

module.exports = router;