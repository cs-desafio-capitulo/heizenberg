const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Product', schema);
