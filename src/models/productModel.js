import mongoose, { Schema } from 'mongoose';

const ratingSchema = new mongoose.Schema({
  rate: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
});

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    rating: [ratingSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
