const mongoose = require('mongoose');

const supervisorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add other fields as necessary
});

const Supervisor = mongoose.model('Supervisor', supervisorSchema);

module.exports = Supervisor;