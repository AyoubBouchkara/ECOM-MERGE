const mongoose = require('mongoose')

const purchaseSchema = mongoose.Schema(
    {
        productName: { type: String , required: true},
        productTitle: { type: String , required: true},
        productDescription: { type: String , required: true},
        productFeature1: { type: String , required: true},
        productFeature2: { type: String , required: true},
        productFeature3: { type: String , required: true},
        productImg1: { type: String , required: true},
        productImg2: { type: String , required: true},
        productImg3: { type: String , required: true},
        productquantity: { type: Number , required: true},
        productPrice: { type: Number , required: true},
        promoPrice: { type: Number },
        totalP: { type: Number },
        dateP: { type: String },
        storeId: { type: Number }, //*********** modify this *************** */
        societeCode : { type: String } //*********** modify this *************** */
    },
    { timestamps: true }
)


const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;