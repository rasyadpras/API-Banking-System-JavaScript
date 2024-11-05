const Joi = require("joi");
const ResponseError = require("../responses/response-error");

function validateAddCashTransaction(req, res, next) {
    const schema = Joi.object({
        account_number: Joi.string().pattern(/^\d{10}$/).required(),
        amount: Joi.number().min(50000).precision(2).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        throw new ResponseError(400, "Bad Request", error.details[0].message);
    }
    next();
}

module.exports = { validateAddCashTransaction };