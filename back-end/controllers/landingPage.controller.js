const LandingPage = require('../models/landingPage.model.js');

// Read all landing pages
exports.readData = async (req, res) => {
    try {
        const landingPages = await LandingPage.find().sort({ createdAt: -1 }).lean();
        res.status(200).json(landingPages);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// Create a new landing page
exports.createData = async (req, res) => {
    try {
        const landingPage = await LandingPage.create(req.body);
        res.status(201).json(landingPage);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// Update a landing page
exports.updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedLandingPage = await LandingPage.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedLandingPage) {
            res.status(200).json({ message: 'Updated successfully!', updatedLandingPage });
        } else {
            res.status(404).json({ message: 'Landing page not found' });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// Delete a landing page
exports.deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLandingPage = await LandingPage.findByIdAndDelete(id);
        if (deletedLandingPage) {
            res.status(200).json({ message: 'Deleted successfully!' });
        } else {
            res.status(404).json({ message: 'Landing page not found' });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};