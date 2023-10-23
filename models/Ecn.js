const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const EcnSchema = new Schema({
    enquiryNo: {
        type: String,
        required: true
    },
    ecnNo: {
        type: String,
        required: true
    },
    partName: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    ecnType: {
        type: String,
        required: true
    },
})

const Ecn = mongoose.model("Ecn", EcnSchema);
module.exports = Ecn;