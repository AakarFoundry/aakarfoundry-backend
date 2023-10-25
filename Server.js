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


app.get('/registers', async (req, res) => {
    const registers = await Register.find();
    res.json(registers);
});


app.post('/register/new', (req, res) => {
    const register = new Register({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        department: req.body.department,
        priority: req.body.priority,

    });
    register.save();
    res.json(register);
});

app.get('/customers', async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
});

app.post('/customer/new', (req, res) => {
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

app.get('/rfqs', async (req, res) => {
    const rfqs = await Rfq.find();
    res.json(rfqs);
});

app.post('/rfq/new', (req, res) => {
    const rfq = new Rfq({
        name: req.body.name,
        partMach: req.body.partMach,
        partCast: req.body.partCast,
        details: req.body.details,
        enquiry: req.body.enquiry,
        quantity: req.body.quantity,
        life: req.body.life,
        processRequired: req.body.processRequired,
        alloy: req.body.alloy,
        machined: req.body.machined,
        blasting: req.body.blasting,
        productQc: req.body.productQc,
        anodizing: req.body.anodizing,
        coating: req.body.coating,
        materials: req.body.materials,
        pressure: req.body.pressure,
        impregnation: req.body.impregnation,
        treatment: req.body.treatment,
        packaging: req.body.packaging,
        delivery: req.body.delivery,
        works: req.body.works,
        tonnage: req.body.tonnage,
        sampleDate: req.body.sampleDate,
        pswDate: req.body.pswDate,
        remarks: req.body.remarks
    })
    rfq.save();
    res.json(rfq);
});

app.get('/ecns', async (req, res) => {
    const ecns = await Ecn.find();
    res.json(ecns);
});

app.post('/ecn/new', (req, res) => {
    const ecn = new Ecn({
        name: req.body.name,
        partMach: req.body.partMach,
        partCast: req.body.partCast,
        details: req.body.details,
        enquiry: req.body.enquiry,
        quantity: req.body.quantity,
        life: req.body.life,
        processRequired: req.body.processRequired,
        alloy: req.body.alloy,
        machined: req.body.machined,
        blasting: req.body.blasting,
        productQc: req.body.productQc,
        remarks: req.body.remarks
    })
    ecn.save();
    res.json(ecn);
});

app.get('/designs', async (req, res) => {
    const designs = await Design.find();
    res.json(designs);
});

app.post('/design/new', (req, res) => {
    const design = new Design({
        weight:  req.body.weight,
        casting:  req.body.casting,
        area:  req.body.area,
        dieCasting:  req.body.dieCasting,
        impressions:  req.body.impressions,
        rawMaterial:  req.body.rawMaterial,
        dieCost:  req.body.dieCost,
        coreCost:  req.body.coreCost,
        dieLife:  req.body.dieLife,
        diePeriod:  req.body.diePeriod,
        shots:  req.body.shots,
        cores:  req.body.cores,
        sandWeight:  req.body.sandWeight,
        remarks: req.body.remarks,
    });
    design.save();
    res.json(design);
});

app.get('/npds', async (req, res) => {
    const npds = await NPD.find();

    res.json(npds);
});

app.post('/npd/new', (req, res) => {
    const npd = new NPD({
        investment :req.body.investment,
        partFeasible :req.body.partFeasible,
        changes :req.body.changes,
        development :req.body.development
    })
    npd.save();
    res.json(npd);
});

app.get('/risks', async (req, res) => {
    const risks = await Risk.find();

    res.json(risks);
});

app.post('/risks/new',(req,res)=>{
    const risk=new Risk({
        risk :req.body.risk,
        requirement :req.body.requirement,
        application :req.body.application,
        estimation :req.body.estimation,
        remarks :req.body.remarks,
    })
    risk.save();
    res.json(risk);
});

app.listen(3001, () => console.log('Connected to port'));
