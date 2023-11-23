const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt');

const RegisterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    password:{
        type: String,
        default:"aakarfoundry"
    },
    role: {
        type: String,
        required: true
    },
});






const Register = mongoose.model("Register", RegisterSchema);
module.exports = Register;
