require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

// Models
const Exchange = require('./models/Exchange');
const CurrencyPair = require('./models/CurrencyPair');

const app = express();

// Connect to db
mongoose.connect(process.env.DATABASE_URL);

// Checking for database connection
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log(`Connected to database ${db.host}`));

app.use(cors());
// Parse JSON request bodies
app.use(express.json());

app.use(cookieParser());

// @desc    Get all CurrencyPairs for a selected exchange
// @route   GET /exchanges/:exchangeName/currency-pairs
// @access 	Public
app.get('/exchanges/:exchangeName/currency-pairs', async (req, res) => {
  try {
    const exchange = await Exchange.findOne({
      name: req.params.exchangeName,
    });

    if (!exchange) {
      return res
        .status(404)
        .json({ success: false, error: 'Exchange not found' });
    }

    const currencyPairs = await CurrencyPair.aggregate([
      { $match: { exchange: exchange._id } },
      {
        $project: {
          currencyPair: 1,
          price: { $arrayElemAt: ['$priceHistory', -1] },
        },
      },
    ]);

    res.status(200).json({ success: true, data: currencyPairs });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// @desc   	Get latest single currency pair in all exchanges
// @route   GET /currency-pairs/:currency-pair
// @access 	Public
app.get('/currency-pairs/:currencyPair', async (req, res) => {
  try {
    const currencyPairs = await CurrencyPair.find(
      { currencyPair: req.params.currencyPair },
      {
        exchange: 1,
        price: { $arrayElemAt: ['$priceHistory', -1] },
      }
    );

    if (!currencyPairs) {
      return res
        .status(404)
        .json({ success: false, error: 'Currency pair not found' });
    }
    const exchangeIds = currencyPairs.map(cp => cp.exchange);
    const exchanges = await Exchange.find({ _id: { $in: exchangeIds } });

    const exchangeMap = exchanges.reduce((map, exchange) => {
      map[exchange._id.toString()] = exchange.name;
      return map;
    }, {});

    const enrichedCurrencyPairs = currencyPairs.map(cp => ({
      ...cp.toObject(),
      exchangeName: exchangeMap[cp.exchange.toString()],
    }));

    res.status(200).json({ success: true, data: enrichedCurrencyPairs });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc   	Get average price of single currency pair
// @route   GET /exchanges/avg/currencypairs //final
// @route   GET /exchanges/avg/:exchangeName/currency-pairs //temp
// @access 	Public
app.get('/exchanges/avg/currencypairs', async (req, res) => {
  try {
    const exchange = await Exchange.findOne({
      name: 'Bahmani',
    });

    if (!exchange) {
      return res
        .status(404)
        .json({ success: false, error: 'Exchange not found' });
    }

    const currencyPairs = await CurrencyPair.aggregate([
      { $match: { exchange: exchange._id } },
      {
        $project: {
          currencyPair: 1,
          price: { $arrayElemAt: ['$priceHistory', -1] },
        },
      },
    ]);

    res.status(200).json({ success: true, data: currencyPairs });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// @desc   	Get the selected exchange's profile
// @route   GET /exchanges/:exchangeName/profile
// @access 	Public
app.get('/exchanges/:exchangeName/profile', async (req, res) => {
  try {
    const token = req.cookies.access_token;
    const exchange = await Exchange.findOne({
      name: req.params.exchangeName,
    });

    if (!exchange) {
      return res
        .status(404)
        .json({ success: false, error: 'Exchange not found' });
    }

    if (!token) {
      res
        .status(200)
        .json({ success: true, data: { exchange: exchange, isAdmin: false } });
    } else {
      res
        .status(200)
        .json({ success: true, data: { exchange: exchange, isAdmin: true } });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc   	Update the selected exchange's profile
// @route   PUT /exchanges/:exchangeName/profile
// @access  (Private/exchange-name)
app.put(
  '/exchanges/:exchangeName/profile',
  authenticateJWT,
  authorizeUser,
  async (req, res) => {
    const fieldsToUpdate = {
      name: req.body.name,
      description: req.body.description,
      website: req.body.website,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      operatingHours: req.body.operatingHours,
      password: req.body.password,
    };

    try {
      const exchange = await Exchange.findOne({
        name: req.params.exchangeName,
      });
      const updatedExchange = await Exchange.findByIdAndUpdate(
        exchange._id,
        fieldsToUpdate,
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({ success: true, data: updatedExchange });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// @desc    Create new buy/sell price for a given currency pair
// @route   POST /exchanges/:exchangeName/:currencyPair
// @access 	(Private/exchange-name)
app.post(
  '/exchanges/:exchangeName/:currencyPair',
  authenticateJWT,
  authorizeUser,
  async (req, res) => {
    try {
      const exchange = await Exchange.findOne({
        name: req.params.exchangeName,
      });

      if (!exchange) {
        return res
          .status(404)
          .json({ success: false, error: 'Exchange not found' });
      }

      let currencyPair = await CurrencyPair.findOne({
        currencyPair: req.params.currencyPair,
        exchange: exchange._id,
      });

      if (!currencyPair) {
        currencyPair = await CurrencyPair.create({
          currencyPair: req.params.currencyPair,
          exchange: exchange._id,
        });
      }

      currencyPair.priceHistory.push({
        sellPrice: req.body.sellPrice,
        buyPrice: req.body.buyPrice,
      });

      await currencyPair.save();

      res.status(201).json({ success: true, data: currencyPair });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  }
);

// @desc    	Register exchange/admin
// @route   	POST /api/v1/auth/register
// @access  	Public
app.post('/api/v1/auth/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const exchange = new Exchange({
      name: req.body.name,
      description: req.body.description,
      website: req.body.website,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      password: hashedPassword,
    });

    const newExchange = await exchange.save();

    res.status(201).json({ success: true, newExchange });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Login exchange/admin
// @route   POST /api/v1/auth/login
// @access  Public
app.post('/api/v1/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        data: 'Please provide an email and password',
      });
    }

    // Check for exchange
    const exchange = await Exchange.findOne({ email });

    if (!exchange) {
      return res
        .status(401)
        .json({ success: false, data: 'Invalid Email/username' });
    }

    // Check if password matches with the hashed password in DB
    const isMatch = await bcrypt.compare(password, exchange.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, data: 'Invalid Password' });
    }

    const payload = {
      exchangeId: exchange._id,
    };

    const accessToken = generateAccessToken(payload);

    // Set JWT as a cookie
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    });

    res.status(200).json({ success: true, data: 'Login successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Generate access token
function generateAccessToken(exchange) {
  return jwt.sign(exchange, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10m',
  });
}

//Authentication Middleware
function authenticateJWT(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(403).json({ message: 'Access token is missing' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, exchange) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid access token' });
    }
    // Add payload to the request object
    req.exchangeId = exchange.exchangeId;
    next();
  });
}

//Authorization Middleware
async function authorizeUser(req, res, next) {
  const exchange = await Exchange.findOne({ name: req.params.exchangeName });

  if (!exchange) {
    return res.status(404).json({ message: 'Exchange not found' });
  }
  // Check if authenticated exchange's ID matches the ID of the exchange
  if (String(exchange._id) !== String(req.exchangeId)) {
    return res.status(403).json({ message: 'User not authorized' });
  }
  next();
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => console.log('Example app is listening on port 8080.'));
