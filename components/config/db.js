const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = connection;
