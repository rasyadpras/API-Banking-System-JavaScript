const Joi = require("joi");
const ResponseError = require("../responses/response-error");

function validateCreateBankAcc(req, res, next) {
    const schema = Joi.object({
        branch_id: Joi.string().required(),
        profile_id: Joi.string().required(),
        type: Joi.string().valid("regular", "business", "student", "plan", "other"),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        throw new ResponseError(400, "Bad Request", error.details[0].message);
    }
    next();
}

module.exports = { validateCreateBankAcc };
