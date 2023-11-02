const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const NPDSchema = new Schema({
    enquiry: {
        type: String,
        required: true
    },
    investment :{
        type:String,
        required: true,
    },
    partFeasible: {
        type: String,
        required: true,
    },
    remarks:{
        type:String,
        required: true,
    }
});

const NPD =mongoose.model("NPD",NPDSchema);
module.exports = NPD;

