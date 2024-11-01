const Joi = require("joi");
const ResponseError = require("../responses/response-error");

function validateRegister(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string()
            .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/)
            .required()
            .messages({
                "string.pattern.base": "Password must contain one number, one lowercase letter, one uppercase letter, one special character, no space, and it must be at least 8 characters long",
            }),
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

function validateLogin(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        throw new ResponseError(400, "Bad Request", error.details[0].message);
    }
    next();
}

function validateAddRole(req, res, next) {
    const schema = Joi.object({
        role: Joi.string().valid("admin", "officer").required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        throw new ResponseError(400, "Bad Request", error.details[0].message);
    }
    next();
}

function validateForgotPassword(req, res, next) {
    const schema = Joi.object({
        password: Joi.string()
            .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/)
            .required()
            .messages({
                "string.pattern.base": "Password must contain one number, one lowercase letter, one uppercase letter, one special character, no space, and it must be at least 8 characters long",
            }),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        throw new ResponseError(400, "Bad Request", error.details[0].message);
    }
    next();
}

function validateResetPassword(req, res, next) {
    const schema = Joi.object({
        old_password: Joi.string()
            .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/)
            .required()
            .messages({
                "string.pattern.base": "Password must contain one number, one lowercase letter, one uppercase letter, one special character, no space, and it must be at least 8 characters long",
            }),
        new_password: Joi.string()
            .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/)
            .required()
            .messages({
                "string.pattern.base": "Password must contain one number, one lowercase letter, one uppercase letter, one special character, no space, and it must be at least 8 characters long",
            }),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        throw new ResponseError(400, "Bad Request", error.details[0].message);
    }
    next();
}

module.exports = { validateRegister, validateLogin, validateAddRole, validateForgotPassword, validateResetPassword };
