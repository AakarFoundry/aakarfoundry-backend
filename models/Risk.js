const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RiskSchema = new Schema({
    enquiry: {
        type: String,
        required: true
    },
    risk: {
        type: String,
        required: true,
    },
    requirement: {
        type: String,
        required: true,
    },
    application: {
        type: String,
        required: true,
    },
    internal: {
        type: String,
        required: true,
    },
    environment: {
        type: String,
        required: true,
    },
    environment_remarks: {
        type: String,
        required: true,
    },
    investment: {
        type: String,
        required: true,
    },
    investment_remarks: {
        type: String,
        required: true,
    },
    manufacturing: {
        type: String,
        required: true,
    },
    manufacturing_remarks: {
        type: String,
        required: true,
    },
    technical: {
        type: String,
        required: true,
    },
    technical_remarks: {
        type: String,
        required: true,
    },
    estimation: {
        type: String,
        required: true,
    },
    estimation_remarks: {
        type: String,
        required: true,
    },
    regret: {
        type: String,
        required: true,
    },
    regret_remarks: {
        type: String,
        required: true,
    },
    remarks: {
        type: String,
        required: true,
    },
});

const Risk = mongoose.model("Risk", RiskSchema);
module.exports = Risk;

