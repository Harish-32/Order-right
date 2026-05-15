const express = require("express");

const multer = require("multer");
const {

  createProduct,

  getProducts,

  deleteProduct,

  updateProduct,

  getFarmerProducts,

} = require(
  "../controllers/productController"
);

const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
      "-" +
      file.originalname
    );
  },

});

const upload = multer({ storage });

// Routes
router.post(
  "/",
  upload.single("image"),
  createProduct
);

router.get("/", getProducts);

module.exports = router;
// Farmer Products
router.get(
  "/farmer/:farmerId",
  getFarmerProducts
);

// Delete Product
router.delete(
  "/:id",
  deleteProduct
);

// Update Product
router.put(
  "/:id",
  updateProduct
);