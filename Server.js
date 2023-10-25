const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
// const apiRouter = require('./routes/');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MY_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

// app.use("/api", apiRouter);


const Customer = require('./models/Customer');
const Design = require('./models/Design');
const Ecn = require('./models/Ecn');
const Login = require('./models/Login');
const NPD = require('./models/NPD');
const Register = require('./models/Register');
const Rfq = require('./models/Rfq');
const Risk = require('./models/Risk');


app.get('/registers', async (req,res) => {
    const registers = await Register.find();

    res.json(registers);
});


app.post('/register/new', (req,res)=>{
    const register = new Register({
        name:req.body.name,
        email:req.body.email,
        number:req.body.number,
        department:req.body.department ,
        priority: req.body.priority,

    });
    register.save();
    res.json(register);
});

app.get('/customers', async (req,res) => {
    const customers = await Customer.find();

    res.json(customers);
});

app.post('/customer/new', (req,res) => {
    const customer = new Customer({
        customerName: req.body.customerName,
        customerReference: req.body.customerReference,
        contact: req.body.contact,
        delivery: req.body.delivery,
        enquiry: req.body.enquiry,
        path: req.body.path,
        category: req.body.category
    })
    customer.save();
    res.json(customer);
});
app.listen(3001, () => console.log('Connected to port'));
