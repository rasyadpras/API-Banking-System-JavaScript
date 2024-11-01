const Joi = require("joi");
const ResponseError = require("../responses/response-error");

function validateCreateCard(req, res, next) {
    const schema = Joi.object({
        bank_account_id: Joi.string().required(),
        card_type: Joi.string().valid("debit", "credit").required(),
        card_number: Joi.string().pattern(/^\d{16}$/).required(),
        principal: Joi.string().valid("visa", "mastercard", "gpn", "jcb", "union_pay", "american_express", "no_principal", "other").required(),
        expired_date: Joi.string().pattern(/^\d{2}-\d{2}$/).required(),
        cvv: Joi.string().pattern(/^\d{4}$/).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        throw new ResponseError(400, "Bad Request", error.details[0].message);
    }
    next();
}

module.exports = { validateCreateCard };
