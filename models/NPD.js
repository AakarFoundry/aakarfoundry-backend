const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const NPDSchema = new Schema({
    investment :{
        type:String,
        required: true,
    },
    partFeasible :{
        type:String,
        required: true,
    },
    changes :{
        type:String,
        required: true,
    },
    development :{
        type:String,
        required: true,
    },
   
});

const NPD =mongoose.model("NPD",NPDSchema);
module.exports = NPD;

