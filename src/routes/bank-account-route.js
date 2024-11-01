const express = require("express");
const router = express.Router();
const {
    createBankAccount,
    getBankAccountById,
    deleteBankAccount,
} = require("../controllers/bank-account-controller");
const { validateCreateBankAcc } = require("../validations/bank-account-validator");

router.post("/", validateCreateBankAcc, createBankAccount);
router.get("/:id", getBankAccountById);
router.put("/:id", deleteBankAccount);

module.exports = router;
