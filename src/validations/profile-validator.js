const Joi = require("joi");
const ResponseError = require("../responses/response-error");

function validateUpdateProfile(req, res, next) {
    const schema = Joi.object({
        full_name: Joi.string().required(),
        gender: Joi.string().valid("male", "female").required(),
        birth_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
        identity_type: Joi.string().valid("identity_card", "passport", "driver_license", "students_card", "other").required(),
        identity_number: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        province: Joi.string().required(),
        country: Joi.string().required(),
        phone_number: Joi.string().pattern(/^\d{11,13}$/).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        throw new ResponseError(400, "Bad Request", error.details[0].message);
    }
    next();
}

module.exports = { validateUpdateProfile };
