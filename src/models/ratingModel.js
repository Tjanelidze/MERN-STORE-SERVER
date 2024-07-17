import mongoose, { Schema } from 'mongoose';

const ratingSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  rate: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
