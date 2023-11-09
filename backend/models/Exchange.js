const mongoose = require('mongoose');

const ExchangeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  logo: {
    type: String,
  },
  website: {
    type: String,
    match: [
      /(https?:\/\/)?([-a-zA-Z0-9@:%._\+~#=]+\.)*[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL',
    ],
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number cannot be longer than 20 characters'],
    match: [/^\+?[0-9]{1,20}$/, 'Please add a valid phone number'],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  operatingHours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Exchange', ExchangeSchema);
