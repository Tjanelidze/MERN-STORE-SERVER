import asyncHandler from 'express-async-handler';
import { faker } from '@faker-js/faker';
import Product from '../models/productModel.js';

const addProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({});
  res.status(200).json(product);
});

export default { addProduct };
