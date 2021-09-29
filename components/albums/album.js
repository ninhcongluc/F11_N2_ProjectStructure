const mongoose = require('mongoose');

const { Schema } = mongoose;

const albumSchema = new Schema({
  name: {
    type: 'string',
    required: true,
  },
  description: {
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
    enum: ['private', 'public'],
    default: 'public',
  },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
    },
  ],
});

albumSchema.pre('save', function createDate(next) {
  const now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
