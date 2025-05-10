const Product = require('../models/product.model.js');

// Read data
exports.readData = async (req, res) => {
    try {
        const products = await Product.find().populate('storeId').sort({ _id: -1 }).lean();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// Create data
exports.createData = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// Update data
exports.updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedProduct) {
            res.status(200).json({ message: 'Updated successfully!', updatedProduct });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// Delete data
exports.deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (deletedProduct) {
            res.status(200).json({ message: 'Deleted successfully!' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};