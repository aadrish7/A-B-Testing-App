const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminVersionSchema = new Schema({
  adminSelectedVersion: {
    type: String,
    enum: ['A', 'B', null], 
    default: null, 
  },
});

const AdminVersion = mongoose.model('AdminVersion', adminVersionSchema);
module.exports = AdminVersion;
