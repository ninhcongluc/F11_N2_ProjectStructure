const Joi = require('joi-plus');

const albumSchema = Joi.object().keys({
  name: Joi.string().min(4).max(50).required().required(),
  description: Joi.string().min(8).max(200).required(),
  status: Joi.string().valid('public', 'private'),
});

module.exports = albumSchema;
