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


app.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.findOne();
        res.json(customers);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/customer/new', (req, res) => {
    const customer = new Customer(req.body);
    customer.save()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            handleError(res, error);
        });
});


app.get('/registers', async (req, res) => {
    try {
        const registers = await Register.find();
        res.json(registers);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/register/new', (req, res) => {
    const register = new Register(req.body);
    register.save()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            handleError(res, error);
        });
});

app.get('/rfqs', async (req, res) => {
    try {
        const rfqs = await Rfq.find();
        res.json(rfqs);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/rfq/new', (req, res) => {
    const rfq = new Rfq(req.body);
    rfq.save()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            handleError(res, error);
        });
});

app.get('/ecns', async (req, res) => {
    try {
        const ecns = await Ecn.find();
        res.json(ecns);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/ecn/new', (req, res) => {
    const ecn = new Ecn(req.body);
    ecn.save()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            handleError(res, error);
        });
});

app.get('/designs', async (req, res) => {
    try {
        const designs = await Design.find();
        res.json(designs);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/design/new', (req, res) => {
    const design = new Design(req.body);
    design.save()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            handleError(res, error);
        });
});

app.get('/npds', async (req, res) => {
    try {
        const npds = await NPD.find();
        res.json(npds);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/npd/new', (req, res) => {
    const npd = new NPD(req.body);
    npd.save()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            handleError(res, error);
        });
});

app.get('/risks', async (req, res) => {
    try {
        const risks = await Risk.find();
        res.json(risks);
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/risk/new', (req, res) => {
    const risk = new Risk(req.body);
    risk.save()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            handleError(res, error);
        });
});

app.listen(4000, () => console.log('Connected to port'));
