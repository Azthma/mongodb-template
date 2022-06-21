const mongoose = require('mongoose')

const rentalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
  },
  available: {
    type: Number,
    required: true
  },
  by: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Rental', rentalSchema)