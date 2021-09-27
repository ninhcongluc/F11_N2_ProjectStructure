const Joi = require('joi-plus');

const registerSchema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  username: Joi.string().min(6).max(30).required(),
  password: Joi.string()
    .password({
      min: 8,
      max: 200,
      lowercase: true,
      uppercase: true,
      number: true,
      special: true,
      // count: 4, // 4 props true => pass
    })
    .required(),
  repeatPassword: Joi.string().match('password').required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'vn'] },
    })
    .required(),
});

const resetPassSchema = Joi.object().keys({
  newPassword: Joi.string()
    .password({
      min: 8,
      max: 200,
      lowercase: true,
      uppercase: true,
      number: true,
      special: true,
      // count: 4, // 4 props true => pass
    })
    .required(),
  confirmPassword: Joi.string().match('newPassword').required(),
});

module.exports = { registerSchema, resetPassSchema };
