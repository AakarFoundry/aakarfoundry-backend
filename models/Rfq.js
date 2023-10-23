const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RfqSchema  = new Schema({
    name: {
        type: String,
        required: true
    },
    partMach: {
        type: String,
        required: true
    },
    partCast: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    enquiry: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    life: {
        type: String,
        required: true
    },
    processRequired: {
        type: String,
        required: true
    },
    alloy: {
        type: String,
        required: true
    },
    machined: {
        type: String,
        required: true
    },
    blasting: {
        type: String,
        required: true
    },
    productQc: {
        type: String,
        required: true
    },
    anodizing: {
        type: String,
        required: true
    },
    coating: {
        type: String,
        required: true
    },
    materials: {
        type: String,
        required: true
    },
    pressure: {
        type: String,
        required: true
    },
    impregnation: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    packaging: {
        type: String,
        required: true
    },
    delivery: {
        type: String,
        required: true
    },
    works: {
        type: String,
        required: true
    },
    tonnage: {
        type: String,
        required: true
    },
    sampleDate: {
        type: String,
        required: true
    },
    pswDate: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },

})

const Rfq = mongoose.model("Rfq", RfqSchema);
module.exports = Rfq;