const PaymentMode = require('../models/paymentMode.model.js');

// Read all payment modes
exports.readData = async (req, res) => {
    try {
        const paymentModes = await PaymentMode.find().sort({ createdAt: -1 }).lean();
        res.status(200).json(paymentModes);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// Create a new payment mode
exports.createData = async (req, res) => {
    try {
        const paymentMode = await PaymentMode.create(req.body);
        res.status(201).json(paymentMode);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// Update a payment mode
exports.updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPaymentMode = await PaymentMode.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedPaymentMode) {
            res.status(200).json({ message: 'Updated successfully!', updatedPaymentMode });
        } else {
            res.status(404).json({ message: 'Payment mode not found' });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// Delete a payment mode
exports.deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPaymentMode = await PaymentMode.findByIdAndDelete(id);
        if (deletedPaymentMode) {
            res.status(200).json({ message: 'Deleted successfully!' });
        } else {
            res.status(404).json({ message: 'Payment mode not found' });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};