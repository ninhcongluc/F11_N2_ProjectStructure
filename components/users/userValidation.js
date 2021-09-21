const Joi = require('joi');

// standard definition of a user
const userSchema = Joi.object().keys({
  name: Joi.string().min(5).max(30).required(),
  username: Joi.string().min(6).max(20).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  status: Joi.string().valid('user', 'admin'),
});

module.exports = userSchema;
