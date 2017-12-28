import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Product = mongoose.model('Product', schema);

export default Product;
