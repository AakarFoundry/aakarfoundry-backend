const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const CustomerSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    customerReference: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    delivery: {
        type: String,
        required: true
    },
    enquiryDate: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    enquiry: {
        type:String,
        required: true
    },
    status:{
        type : String,
        default:'Details'
    }
})

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;