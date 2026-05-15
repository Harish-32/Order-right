const Product = require("../models/Product");

// Create Product
exports.createProduct = async (req, res) => {

  try {

   const {
  productName,
  category,
  price,
  quantity,
  deliveryRadius,
  farmerId,
  latitude,
  longitude,
} = req.body;

    const product = await Product.create({

      farmerId,

      productName,

      category,

      price,

      quantity,

      deliveryRadius,
      location: {
  latitude,
  longitude,
},

     image: req.file
  ? `http://localhost:5000/${req.file.path}`
  : "",

    });

    res.status(201).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get All Products
exports.getProducts = async (req, res) => {

  try {

    const products =
      await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// Delete Product
exports.deleteProduct =
async (req, res) => {

  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Product Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// Update Product
exports.updateProduct =
async (req, res) => {

  try {

    const product =
      await Product.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }
      );

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// Get Farmer Products
exports.getFarmerProducts =
async (req, res) => {

  try {

    const products =
      await Product.find({

        farmerId:
          req.params.farmerId,

      });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};