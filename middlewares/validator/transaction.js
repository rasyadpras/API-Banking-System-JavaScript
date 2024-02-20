const Joi = require('joi');
const { ResponseTemplate } = require('../../utils/ResponseTemplate');

function validateTrx(req, res, next) {
  const schema = Joi.object({
    amount: Joi.number().precision(2).required(),
    source_account_number: Joi.string().required(),
    destination_account_number: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    const resp = ResponseTemplate(null, 'bad request', error.details[0].message);
    return res.status(400).json(resp);
  }
  next();
}

module.exports = { validateTrx };
