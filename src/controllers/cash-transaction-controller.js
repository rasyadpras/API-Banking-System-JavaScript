const {
    createDepositTransactionService,
    createWithdrawalTransactionService,
    getAllCashTransactionsService,
    getCashTransactionByIdService,
} = require("../services/cash-transaction-services");
const CreateCashTransactionRequest = require("../dto/create-cash-transaction");
const ResponseSuccess = require("../responses/response-success");
const ResponseError = require("../responses/response-error");

function createDeposit(req, res) {
    try {
        const createCashTransactionReq = new CreateCashTransactionRequest(
            req.body.account_number,
            req.body.amount
        );

        const cashTrx = createDepositTransactionService(createCashTransactionReq);
        const resp = new ResponseSuccess(
            201,
            "Created",
            {
                id: cashTrx.id,
                bankAccount: {
                    accountId: cashTrx.bank_account.id,
                    profile: {
                        profileId: cashTrx.bank_account.profile.id,
                        fullName: cashTrx.bank_account.profile.full_name,
                    },
                    accountNumber: cashTrx.bank_account.account_number,
                    bankAccountType: cashTrx.bank_account.bank_account_type,
                },
                transactionType: cashTrx.transaction_type,
                amount: cashTrx.amount,
                transactionDate: cashTrx.transaction_date,
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

function createWithdrawal(req, res) {
    try {
        const createCashTransactionReq = new CreateCashTransactionRequest(
            req.body.account_number,
            req.body.amount
        );

        const cashTrx = createWithdrawalTransactionService(createCashTransactionReq);
        const resp = new ResponseSuccess(
            201,
            "Created",
            {
                id: cashTrx.id,
                bankAccount: {
                    accountId: cashTrx.bank_account.id,
                    profile: {
                        profileId: cashTrx.bank_account.profile.id,
                        fullName: cashTrx.bank_account.profile.full_name,
                    },
                    accountNumber: cashTrx.bank_account.account_number,
                    bankAccountType: cashTrx.bank_account.bank_account_type,
                },
                transactionType: cashTrx.transaction_type,
                amount: cashTrx.amount,
                transactionDate: cashTrx.transaction_date,
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

async function getAllCashTransactions(req, res) {
    try {
        const { bank_acc_id } = req.params;
        const cashTrx = await getAllCashTransactionsService(bank_acc_id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            cashTrx.map(trx => ({
                id: trx.id,
                bankAccount: {
                    accountId: trx.bank_account.id,
                    profile: {
                        profileId: trx.bank_account.profile.id,
                        fullName: trx.bank_account.profile.full_name,
                    },
                    accountNumber: trx.bank_account.account_number,
                    bankAccountType: trx.bank_account.bank_account_type,
                },
                transactionType: trx.transaction_type,
                amount: trx.amount,
                transactionDate: trx.transaction_date,
            }))
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

async function getCashTransactionById(req, res) {
    try {
        const { id } = req.params;
        const cashTrx = await getCashTransactionByIdService(id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            {
                id: cashTrx.id,
                bankAccount: {
                    accountId: cashTrx.bank_account.id,
                    profile: {
                        profileId: cashTrx.bank_account.profile.id,
                        fullName: cashTrx.bank_account.profile.full_name,
                    },
                    accountNumber: cashTrx.bank_account.account_number,
                    bankAccountType: cashTrx.bank_account.bank_account_type,
                },
                transactionType: cashTrx.transaction_type,
                amount: cashTrx.amount,
                transactionDate: cashTrx.transaction_date,
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

module.exports = { createDeposit, createWithdrawal, getAllCashTransactions, getCashTransactionById };
