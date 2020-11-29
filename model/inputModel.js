const mongoose = require('mongoose');

const Inputs = new mongoose.Schema(
  {
    input: {
      type: String,
      required: [true, 'This blank must be filled'],
      trim: true
    },
    priority: {
      type: Number,
      required: [true, 'Please provide a number'],
      min: [1, 'Priority number must be above 0'],
      max: [5, 'Priority number must be below 6']
    },
    checked: {
      type: String,
      default: 'NO'
    }
  },
  { timestamps: true }
);

const Input = mongoose.model('Input', Inputs);

module.exports = Input;
