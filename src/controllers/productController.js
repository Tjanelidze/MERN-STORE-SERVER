import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Rating from '../models/ratingModel.js';
import User from '../models/userModel.js';

// @desc Add Product
// route POST /api/products
// @access Private
const addProduct = asyncHandler(async (req, res) => {
  const { title, price, description, category, image, stock } = req.body;

  // Check if all the required fields are present
  if (!title || !price || !description || !category || !image) {
    res.status(400);
    throw new Error('All fields are required');
  }

  // Check if the price is a valid number
  if (isNaN(price)) {
    res.status(400);
    throw new Error('Price must be a number');
  }

  // Create the product
  const product = await Product.create({
    title,
    price,
    description,
    category,
    image,
    stock,
  });

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400);
    throw new Error('Invalid product data');
  }
});

// @desc Rate Product
// route POST /api/products/:productId
// @access Private
const rateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { _id: userId } = req.user;

  // Check if all the required fields are present
  if (productId === undefined || userId === undefined) {
    res.status(400);
    throw new Error('Invalid product or user');
  }

  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(400);
    throw new Error('Product not found');
  }

  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  // Check if the user has already rated the product
  const foundRating = await Rating.findOne({
    product: productId,
    user: userId,
  });
  if (foundRating) {
    res.status(400);
    throw new Error('Already rated');
  }

  // Create the rating
  const rating = await Rating.create({
    product: productId,
    user: userId,
    rate: req.body.rate,
    count: req.body.count,
  });

  // Add the rating to the product
  if (rating) {
    res.status(200).json({ message: 'Rated successfully' });
  } else {
    res.status(400);
    throw new Error('Invalid rating data');
  }
});

// @desc Get Products
// route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  // Find the product and populate the rating field
  const product = await Product.find().populate('ratings').exec();

  // Check if the product exists
  if (!product) {
    res.status(400);
    throw new Error('Products not found');
  }

  // Return the products
  res.status(200).json(product);
});

// @desc Update product
// PUT /api/products/:productId
// Access Private
const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  // Check if the product exists
  if (!product) {
    res.status(400);
    throw new Error('Product not found');
  }

  if (product) {
    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.image = req.body.image || product.image;
    product.stock = req.body.title || product.title;

    const updateProduct = await product.save();

    res.status(200).json(updateProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Delete product
// DELETE /api/products/:productId
// Access Private
const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  // Check if product exists
  if (!product) {
    res.status(400);
    throw new Error('Product not found');
  }

  // Find and Delete product
  await Product.deleteOne({ _id: productId });

  // Send Success response
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export default {
  addProduct,
  getProducts,
  rateProduct,
  updateProduct,
  deleteProduct,
};
