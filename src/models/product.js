import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const Product = mongoose.model('Product', schema);

export default Product;
