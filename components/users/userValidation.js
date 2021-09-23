const Joi = require('joi-plus');

// standard definition of a user
const userSchema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  username: Joi.string().min(6).max(30).required(),
  password: Joi.string().password({
    min: 8,
    max: 200,
    lowercase: true,
    uppercase: true,
    number: true,
    special: true,
    // count: 4, // 4 props true => pass
  }),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'vn'] },
  }),
  status: Joi.string().valid('inactive', 'active'),
});

module.exports = userSchema;
