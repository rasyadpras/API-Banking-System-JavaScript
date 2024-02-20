const Joi = require('joi');
const { ResponseTemplate } = require('../../utils/ResponseTemplate');

function validateAcc(req, res, next) {
  const schema = Joi.object({
    account_number: Joi.string().required(),
    user_id: Joi.string().required(),
    balance: Joi.number().precision(2).required(),
    status: Joi.string().valid('active', 'closed'),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    const resp = ResponseTemplate(null, 'bad request', error.details[0].message);
    return res.status(400).json(resp);
  }
  next();
}

module.exports = { validateAcc };
