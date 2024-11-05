const {
    createTransferTransactionService,
    getTransferTransactionByIdService,
    getAllTransferTransactionsService,
    getTransferTransactionsBySenderService,
    getTransferTransactionsByReceiverService,
} = require("../services/transfer-transaction-services");
const CreateTransferTransactionRequest = require("../dto/create-transfer-transaction");
const ResponseSuccess = require("../responses/response-success");

async function createTransfer(req, res, next) {
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
                source_account: {
                    account_id: transferTrx.from_account.id,
                    profile: {
                        profile_id: transferTrx.from_account.profile.id,
                        full_name: transferTrx.from_account.profile.full_name,
                    },
                    account_number: transferTrx.from_account.account_number,
                    bank_account_type: transferTrx.from_account.bank_account_type,
                },
                destination_account: {
                    account_id: transferTrx.to_account.id,
                    profile: {
                        profile_id: transferTrx.to_account.profile.id,
                        full_name: transferTrx.to_account.profile.full_name,
                    },
                    account_number: transferTrx.to_account.account_number,
                    bank_account_type: transferTrx.to_account.bank_account_type,
                },
                amount: transferTrx.amount,
                transaction_date: transferTrx.transaction_date,
            }
        );
        return res.status(201).json(resp);
    } catch (e) {
        next(e);
    }
}

async function getTransferTransactionById(req, res, next) {
    try {
        const { id } = req.params;
        const transferTrx = await getTransferTransactionByIdService(id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            {
                id: transferTrx.id,
                source_account: {
                    account_id: transferTrx.from_account.id,
                    profile: {
                        profile_id: transferTrx.from_account.profile.id,
                        full_name: transferTrx.from_account.profile.full_name,
                    },
                    account_number: transferTrx.from_account.account_number,
                    bank_account_type: transferTrx.from_account.bank_account_type,
                },
                destination_account: {
                    account_id: transferTrx.to_account.id,
                    profile: {
                        profile_id: transferTrx.to_account.profile.id,
                        full_name: transferTrx.to_account.profile.full_name,
                    },
                    account_number: transferTrx.to_account.account_number,
                    bank_account_type: transferTrx.to_account.bank_account_type,
                },
                amount: transferTrx.amount,
                transaction_date: transferTrx.transaction_date,
            }
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

async function getAllTransferTransactions(req, res, next) {
    try {
        const { bankAccId } = req.params;
        const transferTrx = await getAllTransferTransactionsService(bankAccId);
        const resp = new ResponseSuccess(
            200,
            "OK",
            transferTrx.map(trx => ({
                id: trx.id,
                source_account: {
                    account_id: trx.from_account.id,
                    profile: {
                        profile_id: trx.from_account.profile.id,
                        full_name: trx.from_account.profile.full_name,
                    },
                    account_number: trx.from_account.account_number,
                    bank_account_type: trx.from_account.bank_account_type,
                },
                destination_account: {
                    account_id: trx.to_account.id,
                    profile: {
                        profile_id: trx.to_account.profile.id,
                        full_name: trx.to_account.profile.full_name,
                    },
                    account_number: trx.to_account.account_number,
                    bank_account_type: trx.to_account.bank_account_type,
                },
                amount: trx.amount,
                transaction_date: trx.transaction_date,
            }))
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

async function getTransferTransactionsBySender(req, res, next) {
    try {
        const { bankAccId } = req.params;
        const transferTrx = await getTransferTransactionsBySenderService(bankAccId);
        const resp = new ResponseSuccess(
            200,
            "OK",
            transferTrx.map(trx => ({
                id: trx.id,
                source_account: {
                    account_id: trx.from_account.id,
                    profile: {
                        profile_id: trx.from_account.profile.id,
                        full_name: trx.from_account.profile.full_name,
                    },
                    account_number: trx.from_account.account_number,
                    bank_account_type: trx.from_account.bank_account_type,
                },
                destination_account: {
                    account_id: trx.to_account.id,
                    profile: {
                        profile_id: trx.to_account.profile.id,
                        full_name: trx.to_account.profile.full_name,
                    },
                    account_number: trx.to_account.account_number,
                    bank_account_type: trx.to_account.bank_account_type,
                },
                amount: trx.amount,
                transaction_date: trx.transaction_date,
            }))
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

async function getTransferTransactionsByReceiver(req, res, next) {
    try {
        const { bankAccId } = req.params;
        const transferTrx = await getTransferTransactionsByReceiverService(bankAccId);
        const resp = new ResponseSuccess(
            200,
            "OK",
            transferTrx.map(trx => ({
                iid: trx.id,
                source_account: {
                    account_id: trx.from_account.id,
                    profile: {
                        profile_id: trx.from_account.profile.id,
                        full_name: trx.from_account.profile.full_name,
                    },
                    account_number: trx.from_account.account_number,
                    bank_account_type: trx.from_account.bank_account_type,
                },
                destination_account: {
                    account_id: trx.to_account.id,
                    profile: {
                        profile_id: trx.to_account.profile.id,
                        full_name: trx.to_account.profile.full_name,
                    },
                    account_number: trx.to_account.account_number,
                    bank_account_type: trx.to_account.bank_account_type,
                },
                amount: trx.amount,
                transaction_date: trx.transaction_date,
            }))
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

module.exports = {
    createTransfer,
    getTransferTransactionById,
    getAllTransferTransactions,
    getTransferTransactionsBySender,
    getTransferTransactionsByReceiver,
};
