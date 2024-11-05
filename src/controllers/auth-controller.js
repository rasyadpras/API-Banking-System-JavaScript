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

async function register(req, res, next) {
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
                user_id: user.id,
                email: user.email,
                roles: user.roles,
                profile: {
                    profile_id: user.profile.id,
                    full_name: user.profile.full_name,
                    gender: user.profile.gender,
                    birth_date: user.profile.birth_date,
                    identity_type: user.profile.identity_type,
                    identity_number: user.profile.identity_number,
                    address: user.profile.address,
                    city: user.profile.city,
                    province: user.profile.province,
                    country: user.profile.country,
                    phone_number: user.profile.phone_number
                }
            }
        );
        return res.status(201).json(resp);
    } catch (e) {
        next(e);
    }
}

async function login(req, res, next) {
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
        next(e);
    }
}

async function addRole(req, res, next) {
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
                    profile_id: user.profile.id,
                    full_name: user.profile.full_name,
                    gender: user.profile.gender
                },
                created_at: user.created_at,
                updated_at: user.updated_at
            }
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

async function forgotPassword(req, res, next) {
    try {
        const { id } = req.params;
        const forgotPasswordReq = new ForgotPasswordRequest(
            req.body.password
        );

        await forgotPasswordService(id, forgotPasswordReq);
        const resp = new ResponseSuccess(
            200,
            "OK",
            "Password has been changed"
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

async function resetPassword(req, res, next) {
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
        next(e);
    }
}

async function verifyAccount(req, res, next) {
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
        next(e);
    }
}

async function unlockAccount(req, res, next) {
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
        next(e);
    }
}

module.exports = { register, login, addRole, forgotPassword, resetPassword, verifyAccount, unlockAccount };
