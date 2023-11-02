const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QualitySchema = new Schema({
    enquiry: {
        type: String,
        required: true
    },
    gaugesCost: {
        type: String,
        required: true
    },
    leakCost: {
        type: String,
        required: true
    },
    washingCost: {
        type: String,
        required: true
    },
    capCost: {
        type: String,
        required: true
    },
    packagingType: {
        type: String,
        required: true
    },
    packagingCost: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    }

})

const Quality = mongoose.model("Quality", QualitySchema);
module.exports= Quality;