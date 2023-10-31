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
    priority: {
        type: String,
        required: true
    },
});


RegisterSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        console.log("Password is being hashed."); // Add this line
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        } catch (error) {
            return next(error);
        }
    }
    next();
});



const Register = mongoose.model("Register", RegisterSchema);
module.exports = Register;
