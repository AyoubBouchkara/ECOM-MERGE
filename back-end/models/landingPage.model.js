const mongoose = require('mongoose');


const LandingPageSchema = new mongoose.Schema({
        store_id : {type: String , required: true},
        lp_Name: { type: String , required: true},
        path: { type: String }
});

module.exports = mongoose.model('LandingPage', LandingPageSchema);
