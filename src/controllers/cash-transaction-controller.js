const {
    createDepositTransactionService,
    createWithdrawalTransactionService,
    getAllCashTransactionsService,
    getCashTransactionByIdService,
} = require("../services/cash-transaction-services");
const CreateCashTransactionRequest = require("../dto/create-cash-transaction");
const ResponseSuccess = require("../responses/response-success");

async function createDeposit(req, res, next) {
    try {
        const createCashTransactionReq = new CreateCashTransactionRequest(
            req.body.account_number,
            req.body.amount
        );

        const cashTrx = await createDepositTransactionService(createCashTransactionReq);
        const resp = new ResponseSuccess(
            201,
            "Created",
            {
                id: cashTrx.id,
                bank_account: {
                    account_id: cashTrx.bank_account.id,
                    profile: {
                        profile_id: cashTrx.bank_account.profile.id,
                        full_name: cashTrx.bank_account.profile.full_name,
                    },
                    account_number: cashTrx.bank_account.account_number,
                    bank_account_type: cashTrx.bank_account.bank_account_type,
                },
                transaction_type: cashTrx.transaction_type,
                amount: cashTrx.amount,
                transaction_date: cashTrx.transaction_date,
            }
        );
        return res.status(201).json(resp);
    } catch (e) {
        next(e);
    }
}

async function createWithdrawal(req, res, next) {
    try {
        const createCashTransactionReq = new CreateCashTransactionRequest(
            req.body.account_number,
            req.body.amount
        );

        const cashTrx = await createWithdrawalTransactionService(createCashTransactionReq);
        const resp = new ResponseSuccess(
            201,
            "Created",
            {
                id: cashTrx.id,
                bank_account: {
                    account_id: cashTrx.bank_account.id,
                    profile: {
                        profile_id: cashTrx.bank_account.profile.id,
                        full_name: cashTrx.bank_account.profile.full_name,
                    },
                    account_number: cashTrx.bank_account.account_number,
                    bank_account_type: cashTrx.bank_account.bank_account_type,
                },
                transaction_type: cashTrx.transaction_type,
                amount: cashTrx.amount,
                transaction_date: cashTrx.transaction_date,
            }
        );
        return res.status(201).json(resp);
    } catch (e) {
        next(e);
    }
}

async function getAllCashTransactions(req, res, next) {
    try {
        const { bank_acc_id } = req.params;
        const cashTrx = await getAllCashTransactionsService(bank_acc_id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            cashTrx.map(trx => ({
                id: trx.id,
                bank_account: {
                    account_id: trx.bank_account.id,
                    profile: {
                        profile_id: trx.bank_account.profile.id,
                        full_name: trx.bank_account.profile.full_name,
                    },
                    account_number: trx.bank_account.account_number,
                    bank_account_type: trx.bank_account.bank_account_type,
                },
                transaction_type: trx.transaction_type,
                amount: trx.amount,
                transaction_date: trx.transaction_date,
            }))
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

async function getCashTransactionById(req, res, next) {
    try {
        const { id } = req.params;
        const cashTrx = await getCashTransactionByIdService(id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            {
                id: cashTrx.id,
                bank_account: {
                    account_id: cashTrx.bank_account.id,
                    profile: {
                        profile_id: cashTrx.bank_account.profile.id,
                        full_name: cashTrx.bank_account.profile.full_name,
                    },
                    account_number: cashTrx.bank_account.account_number,
                    bank_account_type: cashTrx.bank_account.bank_account_type,
                },
                transaction_type: cashTrx.transaction_type,
                amount: cashTrx.amount,
                transaction_date: cashTrx.transaction_date,
            }
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

module.exports = { createDeposit, createWithdrawal, getAllCashTransactions, getCashTransactionById };
