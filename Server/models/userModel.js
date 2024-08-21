const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,  
  },
  version: {
    type: String,
    enum: ['A', 'B', null], 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,  
  },
  firstClick: {
    type: Date,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
