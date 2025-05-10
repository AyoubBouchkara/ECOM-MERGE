const mongoose = require('mongoose');

const landingPageSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true }, // Additional column
        isActive: { type: Boolean, default: true }, // To indicate if the landing page is active
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

const LandingPage = mongoose.model('LandingPage', landingPageSchema);

module.exports = LandingPage;