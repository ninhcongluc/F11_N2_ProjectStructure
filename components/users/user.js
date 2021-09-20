const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: 'string',
    required: true,
    trim: true,
  },
  username: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
  status: {
    type: 'string',
    enum: ['user', 'admin'],
    default: 'user',
  },
});
userSchema.pre('save', function createDate(next) {
  const now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
