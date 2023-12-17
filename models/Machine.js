const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MachineSchema = new Schema({
    enquiry: {
        type: String,
        required: true
    },
    machine: {
        type: Array,
        required: true
    },
    remarks: {
        type: String,
        required: true
    }
})

const Machine = mongoose.model("Machine", MachineSchema);
module.exports= Machine;