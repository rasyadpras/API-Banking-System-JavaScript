const {
    registerService,
    loginService,
    addRoleService,
    forgotPasswordService,
    resetPasswordService,
    verifyAccountService,
    unlockAccountService,
} = require("../services/auth-service");
const RegisterRequest = require("../dto/register");
const LoginRequest = require("../dto/login");
const AddRoleRequest = require("../dto/add-role");
const ForgotPasswordRequest = require("../dto/forgot-password");
const ResetPasswordRequest = require("../dto/reset-password");
const ResponseSuccess = require("../responses/response-success");
const ResponseError = require("../responses/response-error");

async function register(req, res) {
    try {
        const registerReq = new RegisterRequest(
            req.body.email,
            req.body.password,
            req.body.full_name,
            req.body.gender,
            req.body.birth_date,
            req.body.identity_type,
            req.body.identity_number,
            req.body.address,
            req.body.city,
            req.body.province,
            req.body.country,
            req.body.phone_number
        );

        const user = await registerService(registerReq);
        const resp = new ResponseSuccess (
            201,
            "Created",
            {
                userId: user.id,
                email: user.email,
                roles: user.roles.map(r => r.role),
                profile: {
                    profileId: user.profile.id,
                    fullName: user.profile.full_name,
                    gender: user.profile.gender,
                    birthDate: user.profile.birth_date,
                    identityType: user.profile.identity_type,
                    identityNumber: user.profile.identity_number,
                    address: user.profile.address,
                    city: user.profile.city,
                    province: user.profile.province,
                    country: user.profile.country,
                    phoneNumber: user.profile.phone_number
                }
            }
        );
        return res.status(201).json(resp);
    } catch (e) {
        if (e instanceof ResponseError) {
            return res.status(e.status).json({
                statusCode: e.status,
                message: e.message,
                error: e.error
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                message: "Internal Server Error",
                error: e.message
            });
        }
    }
}

async function login(req, res) {
    try {
        const loginReq = new LoginRequest(
            req.body.email,
            req.body.password
        );

        const { token, data } = await loginService(loginReq);
        const resp = new ResponseSuccess(
            200,
            "OK",
            {
                email: data.email,
                token: token,
                roles: data.roles.map(r => r.role),
            }
        );
        return res.status(200).json(resp);
    } catch (e) {
        if (e instanceof ResponseError) {
            return res.status(e.status).json({
                statusCode: e.status,
                message: e.message,
                error: e.error
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                message: "Internal Server Error",
                error: e.message
            });
        }
    }
}

async function addRole(req, res) {
    try {
        const { id } = req.params;
        const addRoleReq = new AddRoleRequest(
            req.body.role
        );

        const user = await addRoleService(id, addRoleReq);
        const resp = new ResponseSuccess(
            200,
            "OK",
            {
                id: user.id,
                email: user.email,
                roles: user.roles.map(r => r.role),
                status: user.status_account,
                profile: {
                    profileId: user.profile.id,
                    fullName: user.profile.full_name,
                    gender: user.profile.gender,
                },
                createdAt: user.created_at,
                updatedAt: user.updated_at
            }
        );
        return res.status(200).json(resp);
    } catch (e) {
        if (e instanceof ResponseError) {
            return res.status(e.status).json({
                statusCode: e.status,
                message: e.message,
                error: e.error
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                message: "Internal Server Error",
                error: e.message
            });
        }
    }
}

async function forgotPassword(req, res) {
    try {
        const { id } = req.params;
        const { password } = new ForgotPasswordRequest(
            req.body.password
        );

        await forgotPasswordService(id, password);
        const resp = new ResponseSuccess(
            200,
            "OK",
            "Password has been changed"
        );
        return res.status(200).json(resp);
    } catch (e) {
        if (e instanceof ResponseError) {
            return res.status(e.status).json({
                statusCode: e.status,
                message: e.message,
                error: e.error
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                message: "Internal Server Error",
                error: e.message
            });
        }
    }
}

async function resetPassword(req, res) {
    try {
        const { id } = req.params;
        const resetPasswordReq = new ResetPasswordRequest(
            req.body.old_password,
            req.body.new_password
        );

        await resetPasswordService(id, resetPasswordReq);
        const resp = new ResponseSuccess(
            200,
            "OK",
            "Password has been changed"
        );
        return res.status(200).json(resp);
    } catch (e) {
        if (e instanceof ResponseError) {
            return res.status(e.status).json({
                statusCode: e.status,
                message: e.message,
                error: e.error
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                message: "Internal Server Error",
                error: e.message
            });
        }
    }
}

async function verifyAccount(req, res) {
    try {
        const { id } = req.params;
        await verifyAccountService(id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            "Account has been verified"
        );
        return res.status(200).json(resp);
    } catch (e) {
        if (e instanceof ResponseError) {
            return res.status(e.status).json({
                statusCode: e.status,
                message: e.message,
                error: e.error
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                message: "Internal Server Error",
                error: e.message
            });
        }
    }
}

async function unlockAccount(req, res) {
    try {
        const { id } = req.params;
        await unlockAccountService(id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            "Account has been unlocked"
        );
        return res.status(200).json(resp);
    } catch (e) {
        if (e instanceof ResponseError) {
            return res.status(e.status).json({
                statusCode: e.status,
                message: e.message,
                error: e.error
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                message: "Internal Server Error",
                error: e.message
            });
        }
    }
}

module.exports = { register, login, addRole, forgotPassword, resetPassword, verifyAccount, unlockAccount };
