const express = require("express");
const router = express.Router();
const {
    createDeposit,
    createWithdrawal,
    getCashTransactionById,
    getAllCashTransactions,
} = require("../controllers/cash-transaction-controller");
const {
    createTransfer,
    getTransferTransactionById,
    getAllTransferTransactions,
    getTransferTransactionsBySender,
    getTransferTransactionsByReceiver,
} = require("../controllers/transfer-transaction-controller");
const { validateAddCashTransaction } = require("../validations/cash-transaction-validator");
const { validateCreateTransfer } = require("../validations/transfer-validator");

router.post("/cash-flow/deposit", validateAddCashTransaction, createDeposit);
router.post("/cash-flow/withdraw", validateAddCashTransaction, createWithdrawal);
router.get("/cash-flow/:id", getCashTransactionById);
router.get("/:bankAccId/cash-flow", getAllCashTransactions);

router.post("/transfer", validateCreateTransfer, createTransfer);
router.get("/transfer/:id", getTransferTransactionById);
router.get("/:bankAccId/transfer", getAllTransferTransactions);
router.get("/:bankAccId/transfer/out", getTransferTransactionsBySender);
router.get("/:bankAccId/transfer/in", getTransferTransactionsByReceiver);

module.exports = router;
