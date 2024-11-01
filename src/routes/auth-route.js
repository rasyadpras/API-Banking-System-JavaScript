const express = require("express");
const router = express.Router();
const {
    register,
    login,
    addRole,
    forgotPassword,
    resetPassword,
    verifyAccount,
    unlockAccount,
} = require("../controllers/auth-controller");
const {
    validateRegister,
    validateLogin,
    validateAddRole,
    validateForgotPassword,
    validateResetPassword,
} = require("../validations/auth-validator");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.patch("/role/:id", validateAddRole, addRole);
router.patch("/forgot-password/:id", validateForgotPassword, forgotPassword);
router.patch("/reset-password/{id}", validateResetPassword, resetPassword);
router.patch("/verify/:id", verifyAccount);
router.patch("/unlock/:id", unlockAccount);

module.exports = router;
