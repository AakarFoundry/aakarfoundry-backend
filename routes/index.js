const express = require("express");
const router = express.Router();

const Customer = require('../models/Customer');
const Design = require('../models/Design');
const Ecn = require('../models/Ecn');
const Login = require('../models/Login');
const NPD = require('../models/NPD');
const Register = require('../models/Register');
const Rfq = require('../models/Rfq');
const Risk = require('../models/Risk');


router.get('/customers', async (req,res) => {
    const customers = await Customer.find();

    res.json(customers);
});

router.post('/customers/new', (req,res) => {
    const customer = new Customer({
        customerName: req.body.text,
        customerReference: req.body.text,
        contact: req.body.text,
        delivery: req.body.text,
        enquiry: req.body.text,
        path: req.body.text,
        category: req.body.text
    })

    res.json(customer);
});