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
    enquiry: {
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
})

const Customer = mongoose.model("Customer", CustomerSchema);
model.exports = Customer;