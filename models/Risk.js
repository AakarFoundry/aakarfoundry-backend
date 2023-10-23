const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RiskSchema = new Schema({
    risk :{
        type:String,
        required: true,
    },
    requirement :{
        type:String,
        required: true,
    },
    application :{
        type:String,
        required: true,
    },
    estimation :{
        type:String,
        required: true,
    },
    remarks :{
        type:String,
        required: true,
    },
});

const Risk =mongoose.model("Risk",RiskSchema);
module.exports = Risk;

