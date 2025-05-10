const mongoose = require('mongoose');

const paymentModeSchema = mongoose.Schema(
    {
        modeName: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

const PaymentMode = mongoose.model('PaymentMode', paymentModeSchema);

module.exports = PaymentMode;