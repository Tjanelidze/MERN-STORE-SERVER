import mongoose, { Schema } from 'mongoose';

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
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        // Remove the virtual `id` field when serializing to JSON
        delete ret.id;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        // Remove the virtual `id` field when serializing to JSON
        delete ret.id;
      },
    },
    timestamps: true,
  }
);

// Virtual populate
productSchema.virtual('ratings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'product',
});

const Product = mongoose.model('Product', productSchema);

export default Product;
