const mongoose = require('mongoose');

const storeSchema = mongoose.Schema(
    {
        storeName: { type: String, required: true },
        activity: { type: String, required: true },
        currency: { type: String, required: true },
        landingPageId: { type: String, required: true } // Assuming this is a string reference
    },
    { timestamps: true }
);

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;