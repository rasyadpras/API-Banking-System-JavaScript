const {
    createTransferTransactionService,
    getTransferTransactionByIdService,
    getAllTransferTransactionsService,
    getTransferTransactionsBySenderService,
    getTransferTransactionsByReceiverService,
} = require("../services/transfer-transaction-services");
const CreateTransferTransactionRequest = require("../dto/create-transfer-transaction");
const ResponseSuccess = require("../responses/response-success");
const ResponseError = require("../responses/response-error");

async function createTransfer(req, res) {
    try {
        const createTransferTransactionReq = new CreateTransferTransactionRequest(
            req.body.source_account_number,
            req.body.destination_account_number,
            req.body.amount
        );

        const transferTrx = await createTransferTransactionService(createTransferTransactionReq);
        const resp = new ResponseSuccess(
            201,
            "Created",
            {
                id: transferTrx.id,
                sourceAccount: {
                    accountId: transferTrx.source_account.id,
                    profile: {
                        profileId: transferTrx.source_account.profile.id,
                        fullName: transferTrx.source_account.profile.full_name,
                    },
                    accountNumber: transferTrx.source_account.account_number,
                    bankAccountType: transferTrx.source_account.bank_account_type,
                },
                destinationAccount: {
                    accountId: transferTrx.destination_account.id,
                    profile: {
                        profileId: transferTrx.destination_account.profile.id,
                        fullName: transferTrx.destination_account.profile.full_name,
                    },
                    accountNumber: transferTrx.destination_account.account_number,
                    bankAccountType: transferTrx.destination_account.bank_account_type,
                },
                amount: transferTrx.amount,
                transactionDate: transferTrx.transaction_date,
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

async function getTransferTransactionById(req, res) {
    try {
        const { id } = req.params;
        const transferTrx = await getTransferTransactionByIdService(id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            {
                id: transferTrx.id,
                sourceAccount: {
                    accountId: transferTrx.source_account.id,
                    profile: {
                        profileId: transferTrx.source_account.profile.id,
                        fullName: transferTrx.source_account.profile.full_name,
                    },
                    accountNumber: transferTrx.source_account.account_number,
                    bankAccountType: transferTrx.source_account.bank_account_type,
                },
                destinationAccount: {
                    accountId: transferTrx.destination_account.id,
                    profile: {
                        profileId: transferTrx.destination_account.profile.id,
                        fullName: transferTrx.destination_account.profile.full_name,
                    },
                    accountNumber: transferTrx.destination_account.account_number,
                    bankAccountType: transferTrx.destination_account.bank_account_type,
                },
                amount: transferTrx.amount,
                transactionDate: transferTrx.transaction_date,
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

async function getAllTransferTransactions(req, res) {
    try {
        const { bankAccId } = req.params;
        const transferTrx = await getAllTransferTransactionsService(bankAccId);
        const resp = new ResponseSuccess(
            200,
            "OK",
            transferTrx.map(trx => ({
                id: trx.id,
                sourceAccount: {
                    accountId: trx.source_account.id,
                    profile: {
                        profileId: trx.source_account.profile.id,
                        fullName: trx.source_account.profile.full_name,
                    },
                    accountNumber: trx.source_account.account_number,
                    bankAccountType: trx.source_account.bank_account_type,
                },
                destinationAccount: {
                    accountId: trx.destination_account.id,
                    profile: {
                        profileId: trx.destination_account.profile.id,
                        fullName: trx.destination_account.profile.full_name,
                    },
                    accountNumber: trx.destination_account.account_number,
                    bankAccountType: trx.destination_account.bank_account_type,
                },
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

async function getTransferTransactionsBySender(req, res) {
    try {
        const { bankAccId } = req.params;
        const transferTrx = await getTransferTransactionsBySenderService(bankAccId);
        const resp = new ResponseSuccess(
            200,
            "OK",
            transferTrx.map(trx => ({
                id: trx.id,
                sourceAccount: {
                    accountId: trx.source_account.id,
                    profile: {
                        profileId: trx.source_account.profile.id,
                        fullName: trx.source_account.profile.full_name,
                    },
                    accountNumber: trx.source_account.account_number,
                    bankAccountType: trx.source_account.bank_account_type,
                },
                destinationAccount: {
                    accountId: trx.destination_account.id,
                    profile: {
                        profileId: trx.destination_account.profile.id,
                        fullName: trx.destination_account.profile.full_name,
                    },
                    accountNumber: trx.destination_account.account_number,
                    bankAccountType: trx.destination_account.bank_account_type,
                },
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

async function getTransferTransactionsByReceiver(req, res) {
    try {
        const { bankAccId } = req.params;
        const transferTrx = await getTransferTransactionsByReceiverService(bankAccId);
        const resp = new ResponseSuccess(
            200,
            "OK",
            transferTrx.map(trx => ({
                id: trx.id,
                sourceAccount: {
                    accountId: trx.source_account.id,
                    profile: {
                        profileId: trx.source_account.profile.id,
                        fullName: trx.source_account.profile.full_name,
                    },
                    accountNumber: trx.source_account.account_number,
                    bankAccountType: trx.source_account.bank_account_type,
                },
                destinationAccount: {
                    accountId: trx.destination_account.id,
                    profile: {
                        profileId: trx.destination_account.profile.id,
                        fullName: trx.destination_account.profile.full_name,
                    },
                    accountNumber: trx.destination_account.account_number,
                    bankAccountType: trx.destination_account.bank_account_type,
                },
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

module.exports = {
    createTransfer,
    getTransferTransactionById,
    getAllTransferTransactions,
    getTransferTransactionsBySender,
    getTransferTransactionsByReceiver,
};
