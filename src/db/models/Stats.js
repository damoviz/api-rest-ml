const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StatsSchema = new Schema({
  farthest: {
    type: String,
    required: true
  },
  closest: {
    type: String,
    required: true
  },
  trace: [{
    iso_code: String,
    distance: Number,
    invocations: Number
  }],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Stats', StatsSchema)