const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
mongoose.connect(process.env.MY_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to DB"))
    .catch(error => console.error("Database connection error:", error));
const Customer = require('./models/Customer');
const Design = require('./models/Design');
const Ecn = require('./models/Ecn');
const Login = require('./models/Login');
const NPD = require('./models/NPD');
const Register = require('./models/Register');
const Rfq = require('./models/Rfq');
const Risk = require('./models/Risk');
const Machine = require('./models/Machine');
const Quality = require('./models/Quality');
// Error handling middleware function
function handleError(res, error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
}
// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Register.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed. Password does not match.' });
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });
        res.status(200).json({ message: 'Authentication successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/dashboard', async (req, res) => {
    try {
        const dash = await Customer.find({}, 'customerName contact enquiry');
        res.json(dash);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/customers/:enquiry', async (req, res) => {
    try {
        const enquiry = req.params.enquiry;
        const customer = await Customer.findOne({ enquiry: enquiry });
        res.json(customer);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/customer/new', async (req, res) => {
    try {
        const customerData = req.body;
        let enquiryNo;
        if (req.body.enquiry === 'NA') {
            if (req.body.category === "RFQ") {
                const temp = await Rfq.countDocuments() + 3001;
                enquiryNo = 'RFQ - ' + temp;
            } else {
                const temp = await Ecn.countDocuments() + 3001;
                enquiryNo = 'ECN - ' + temp;
            }
            customerData.enquiry = enquiryNo;
            const customer = new Customer(customerData);
            const savedCustomer = await customer.save();
        }
        else {
            enquiryNo = req.body.enquiry;
            const customer = await Customer.replaceOne({ enquiry: enquiryNo }, customerData);
            // const savedCustomer = await customer.save();
        }
        res.json({ enquiryNo });
    } catch (error) {
        handleError(res, error);
    }
});
app.get('/machines/:enquiry', async (req, res) => {
    try {
        const enquiry = req.params.enquiry;
        const machine = await Machine.findOne({ enquiry: enquiry });
        res.json(machine);
    } catch (error) {
        handleError(res, error);
    }
});
app.post('/machine/new', async (req, res) => {
    try {
        const machineExists = await Machine.exists({ enquiry: req.body.enquiry });
        const machineData = req.body;
        if (machineExists) {
            enquiry = req.body.enquiry;
            const machine = await Machine.replaceOne({ enquiry: enquiry }, machineData)
        } else {
            const machine = new Machine(req.body);
            machine.save();
        }
        res.json('done');
    } catch (error) {
        handleError(res, error);
    }
});
app.get('/qualities/:enquiry', async (req,res) => {
    try {
        const enquiry = req.params.enquiry;
        const quality = await Quality.findOne({ enquiry: enquiry });
        res.json(quality);
    } catch (error) {
        handleError(res, error);
    }
})
app.post('/quality/new', async (req, res) => {
    try {
        const qualityExists = await Quality.exists({enquiry: req.body.enquiry})
        const qualityData = req.body;
        if(qualityExists) {
            enquiry = req.body.enquiry;
            const quality = await Quality.replaceOne({enquiry:enquiry}, qualityData);
        } else {
            const quality = new Quality(req.body);
            quality.save();
        }
        res.json('done');
    } catch (error) {
        handleError(res, error);
    }

    // const quality = new Quality(req.body);
    // quality.save()
    //     .then(result => {
    //         res.json(result._id);
    //     })
    //     .catch(error => {
    //         handleError(res, error);
    //     });
});

app.get('/registers', async (req, res) => {
    try {
        const registers = await Register.find();
        res.json(registers);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/register/new', async (req, res) => {
    const { name, email, number, department, password, priority } = req.body;
    const passwordToUse = password || 'aakarfoundry';
    const register = new Register({
        name,
        email,
        number,
        department,
        password: passwordToUse,
        priority
    });

    register.save()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            handleError(res, error);
        });
});

app.get('/rfqs/:enquiry', async (req, res) => {
    try {
        const enquiry = req.params.enquiry;
        const rfq = await Rfq.findOne({ enquiry: enquiry });
        res.json(rfq);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/rfq/new', async (req, res) => {
    try {
        const rfqExists = await Rfq.exists({ enquiry: req.body.enquiry });
        const rfqData = req.body;
        if (rfqExists) {
            enquiry = req.body.enquiry;
            const rfq = await Rfq.replaceOne({ enquiry: enquiry }, rfqData)
        } else {
            const rfq = new Rfq(req.body);
            rfq.save();
        }
        res.json('done');
    } catch (error) {
        handleError(res, error);
    }
    // const rfq = new Rfq(req.body);
    // rfq.save()
    //     .then(result => {
    //         res.json(result);
    //     })
    //     .catch(error => {
    //         handleError(res, error);
    //     });
});

app.get('/ecns/:enquiry', async (req, res) => {
    try {
        const enquiry = req.params.enquiry;
        const ecn = await Ecn.findOne({ enquiry: enquiry });
        res.json(ecn);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/ecn/new', async (req, res) => {
    try {
        const ecnExists = await Ecn.exists({ enquiry: req.body.enquiry });
        const ecnData = req.body;
        if (ecnExists) {
            enquiry = req.body.enquiry;
            const ecn = await Ecn.replaceOne({ enquiry: enquiry }, ecnData)
        } else {
            const ecn = new Ecn(req.body);
            ecn.save();
        }
        res.json('done');
    } catch (error) {
        handleError(res, error);
    }
    // const ecn = new Ecn(req.body);
    // ecn.save()
    //     .then(result => {
    //         res.json(result);
    //     })
    //     .catch(error => {
    //         handleError(res, error);
    //     });
});

app.get('/designs/:enquiry', async (req, res) => {
    try {
        const enquiry = req.params.enquiry;
        const design = await Design.findOne({ enquiry: enquiry });
        res.json(design);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/design/new', async (req, res) => {
    try {
        const designExists = await Design.exists({ enquiry: req.body.enquiry });
        const designData = req.body;
        if (designExists) {
            enquiry = req.body.enquiry;
            const design = await Design.replaceOne({ enquiry: enquiry }, designData)
        } else {
            const design = new Design(req.body);
            design.save();
        }
        res.json('done');
    } catch (error) {
        handleError(res, error);
    }
    // const design = new Design(req.body);
    // design.save()
    //     .then(result => {
    //         res.json(result);
    //     })
    //     .catch(error => {
    //         handleError(res, error);
    //     });
});

app.get('/npds/:enquiry', async (req, res) => {
    try {
        const enquiry = req.params.enquiry;
        const npd = await NPD.findOne({ enquiry: enquiry });
        res.json(npd);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/npd/new', async (req, res) => {
    try {
        const npdExists = await NPD.exists({ enquiry: req.body.enquiry });
        const npdData = req.body;
        if (npdExists) {
            enquiry = req.body.enquiry;
            const npd = await NPD.replaceOne({ enquiry: enquiry }, npdData)
        } else {
            const npd = new NPD(req.body);
            npd.save();
        }
        res.json('done');
    } catch (error) {
        handleError(res, error);
    }
    // const npd = new NPD(req.body);
    // npd.save()
    //     .then(result => {
    //         res.json(result);
    //     })
    //     .catch(error => {
    //         handleError(res, error);
    //     });
});

app.get('/risks/:enquiry', async (req, res) => {
    try {
        const enquiry = req.params.enquiry;
        const risk = await Risk.findOne({ enquiry: enquiry });
        res.json(risk);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/risk/new', async (req, res) => {
    try {
        const riskExists = await Risk.exists({ enquiry: req.body.enquiry });
        const riskData = req.body;
        if (riskExists) {
            enquiry = req.body.enquiry;
            const risk = await Risk.replaceOne({ enquiry: enquiry }, riskData)
        } else {
            const risk = new Risk(req.body);
            risk.save();
        }
        res.json('done');
    } catch (error) {
        handleError(res, error);
    }
    // const risk = new Risk(req.body);
    // risk.save()
    //     .then(result => {
    //         res.json(result);
    //     })
    //     .catch(error => {
    //         handleError(res, error);
    //     });
});

app.listen(4000, () => console.log('Connected to port'));
