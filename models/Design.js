const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DesignSchema = new Schema({
    enquiry: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    casting: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    dieCasting: {
        type: String,
        required: true
    },
    impressions: {
        type: String,
        required: true
    },
    rawMaterial: {
        type: String,
        required: true
    },
    dieCost: {
        type: String,
        required: true
    },
    coreCost: {
        type: String,
        required: true
    },
    dieLife: {
        type: String,
        required: true
    },
    diePeriod: {
        type: String,
        required: true
    },
    shots: {
        type: String,
        required: true
    },
    cores: {
        type: String,
        required: true
    },
    sandWeight: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
})

const Design = mongoose.model("Design", DesignSchema);
module.exports = Design;