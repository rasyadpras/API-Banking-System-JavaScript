const Joi = require('joi');
const { ResponseTemplate } = require('../../utils/ResponseTemplate');

function validateUser(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    username: Joi.string().alphanum().min(5).max(25)
      .required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{5,30}$/).required(),
    role: Joi.string().valid('admin', 'user'),
    fullname: Joi.string().required(),
    identity_type: Joi.string().valid('identity_card', 'driver_license', 'other'),
    identity_number: Joi.string().required(),
    address: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    const resp = ResponseTemplate(null, 'bad request', error.details[0].message);
    return res.status(400).json(resp);
  }
  next();
}

module.exports = { validateUser };
