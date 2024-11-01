const Joi = require("joi");
const ResponseError = require("../responses/response-error");

function validateCreateTransfer(req, res, next) {
    const schema = Joi.object({
        source_account_number: Joi.string().pattern(/^\d{10}$/).required(),
        destination_account_number: Joi.string().pattern(/^\d{10}$/).required(),
        amount: Joi.number().precision(2).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        throw new ResponseError(400, "Bad Request", error.details[0].message);
    }
    next();
}

module.exports = { validateCreateTransfer };
