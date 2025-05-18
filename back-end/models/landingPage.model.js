const mongoose = require('mongoose');


const LandingPageSchema = new mongoose.Schema({
  templateName: String,
  lnadingPageId: String,
  storeID: String,
  productID: Number,
  features: String
});

module.exports = mongoose.model('LandingPage', LandingPageSchema);
