const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  ts: { type: Date, required: true },
  machine_status: { type: Number, required: true },
  vibration: { type: Number, required: true }
});

module.exports = mongoose.model('Data', dataSchema, 'cwathare');