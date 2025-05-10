const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        promoPrice: { type: Number },
        buyingPrice: { type: Number, required: true },
        quantity: { type: Number, required: true },
        storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true }, // Foreign key reference
        visibility: { type: Boolean, default: true } // New visibility field
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;