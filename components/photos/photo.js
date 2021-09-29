const mongoose = require('mongoose');

const { Schema } = mongoose;

const photoSchema = new Schema({
  name: {
    type: 'string',
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  albumId: { type: Schema.Types.ObjectId, ref: 'Album' },
  link: {
    type: 'string',
    required: true,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

photoSchema.pre('save', function createDate(next) {
  const now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
