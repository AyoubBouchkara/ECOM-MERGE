const LandingPage = require('../models/landingPage.model');

exports.saveLandingPage = async (req, res) => {
  try {
    const landing = new LandingPage(req.body);
    await landing.save();
    res.status(201).json({ message: 'Landing page saved successfully!' });
  } catch (err) {
    console.error('Error saving landing page:', err);
    res.status(500).json({ message: 'Failed to save landing page', error: err });
  }
};
