const Joi = require("joi");
const ResponseError = require("../responses/response-error");

function validateCreateBranch(req, res, next) {
    const schema = Joi.object({
        branch_code: Joi.string().pattern(/^\d{3}$/).required(),
        branch_name: Joi.string().required(),
        region: Joi.string().required(),
        address: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        throw new ResponseError(400, "Bad Request", error.details[0].message);
    }
    next();
}

function validateUpdateBranch(req, res, next) {
    const schema = Joi.object({
        branch_name: Joi.string().required(),
        address: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        throw new ResponseError(400, "Bad Request", error.details[0].message);
    }
    next();
}

module.exports = { validateCreateBranch, validateUpdateBranch };
