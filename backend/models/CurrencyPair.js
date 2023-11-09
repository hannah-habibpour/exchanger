const mongoose = require('mongoose');

const CurrencyPairSchema = new mongoose.Schema({
  exchange: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exchange',
    required: [true, 'Please add an exchange ID'],
  },
  currencyPair: {
    type: String,
    required: [true, 'Please add a currency pair'],
    match: [/[a-z]{3}-[a-z]{3}/, 'Please add a valid format'],
  },
  priceHistory: [
    {
      sellPrice: {
        type: Number,
        required: [true, 'Please add a sell price'],
        min: 0, // Minimum value (non-negative)
      },
      buyPrice: {
        type: Number,
        required: [true, 'Please add a buy price'],
        min: 0,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('CurrencyPair', CurrencyPairSchema);
