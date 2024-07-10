import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

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

// TODO: Get Products

// TODO: Update Product

// TODO: Delete Product

export default { addProduct };
