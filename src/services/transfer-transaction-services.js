const { PrismaClient, BankAccountStatus } = require("@prisma/client");
const ResponseError = require("../responses/response-error");
const prisma = new PrismaClient();

async function createTransferTransactionService(createTransferTransactionReq) {
    const { source_account_number, destination_account_number, amount } = createTransferTransactionReq;

    const sourceAccount = await prisma.bank_accounts.findUnique({ where: { account_number: source_account_number } });
    if (!sourceAccount) {
        throw new ResponseError(404, "Not Found", "Bank account number not found");
    }

    const destinationAccount = await prisma.bank_accounts.findUnique({ where: { account_number: destination_account_number } });
    if (!destinationAccount) {
        throw new ResponseError(404, "Not Found", "Bank account number not found");
    }
    if (destinationAccount.status_bank_account === BankAccountStatus.closed) {
        throw new ResponseError(400, "Bad Request", "Destination account is closed");
    }

    if (sourceAccount.balance < amount) {
        throw new ResponseError(400, "Bad Request", "Insufficient balance");
    }

    await prisma.bank_accounts.update({
        where: { account_number: source_account_number },
        data: { balance: sourceAccount.balance - amount }
    });
    await prisma.bank_accounts.update({
        where: { account_number: destination_account_number },
        data: { balance: destinationAccount.balance + amount }
    });

    return prisma.transfer_transactions.create({
        data: {
            source_account: { connect: { account_number: source_account_number } },
            destination_account: { connect: { account_number: destination_account_number } },
            amount,
        },
    });
}

async function getTransferTransactionByIdService(id) {
    const transferTrx = await prisma.transfer_transactions.findUnique({
        where: { id },
        select: {
            id: true,
            from_account: {
                select: {
                    id: true,
                    profile: {
                        select: {
                            id: true,
                            full_name: true,
                        }
                    },
                    account_number: true,
                    bank_account_type: true,
                }
            },
            to_account: {
                select: {
                    id: true,
                    profile: {
                        select: {
                            id: true,
                            full_name: true,
                        }
                    },
                    account_number: true,
                    bank_account_type: true,
                }
            },
            amount: true,
            transaction_date: true,
        }
    });

    if (!transferTrx) {
        throw new ResponseError(404, "Not Found", "Transaction not found");
    }
    return transferTrx;
}

async function getAllTransferTransactionsService(bank_acc_id) {
    const transferTrx = await prisma.transfer_transactions.findMany({
        where: {
            OR: [
                { source_account_id: bank_acc_id },
                { destination_account_id: bank_acc_id },
            ],
        },
        orderBy: {
            id: "asc",
        },
        select: {
            id: true,
            from_account: {
                select: {
                    id: true,
                    profile: {
                        select: {
                            id: true,
                            full_name: true,
                        }
                    },
                    account_number: true,
                    bank_account_type: true,
                }
            },
            to_account: {
                select: {
                    id: true,
                    profile: {
                        select: {
                            id: true,
                            full_name: true,
                        }
                    },
                    account_number: true,
                    bank_account_type: true,
                }
            },
            amount: true,
            transaction_date: true,
        }
    });

    if (!transferTrx) {
        throw new ResponseError(404, "Not Found", "Bank account not found");
    }
    return transferTrx;
}

async function getTransferTransactionsBySenderService(bank_acc_id) {
    const transferTrx = await prisma.transfer_transactions.findMany({
        where: {
            source_account_id: bank_acc_id,
        },
        orderBy: {
            id: "asc",
        },
        select: {
            id: true,
            from_account: {
                select: {
                    id: true,
                    profile: {
                        select: {
                            id: true,
                            full_name: true,
                        }
                    },
                    account_number: true,
                    bank_account_type: true,
                }
            },
            to_account: {
                select: {
                    id: true,
                    profile: {
                        select: {
                            id: true,
                            full_name: true,
                        }
                    },
                    account_number: true,
                    bank_account_type: true,
                }
            },
            amount: true,
            transaction_date: true,
        }
    });

    if (!transferTrx) {
        throw new ResponseError(404, "Not Found", "Bank account not found");
    }
    return transferTrx;
}

async function getTransferTransactionsByReceiverService(bank_acc_id) {
    const transferTrx = await prisma.transfer_transactions.findMany({
        where: {
            destination_account_id: bank_acc_id,
        },
        orderBy: {
            id: "asc",
        },
        select: {
            id: true,
            from_account: {
                select: {
                    id: true,
                    profile: {
                        select: {
                            id: true,
                            full_name: true,
                        }
                    },
                    account_number: true,
                    bank_account_type: true,
                }
            },
            to_account: {
                select: {
                    id: true,
                    profile: {
                        select: {
                            id: true,
                            full_name: true,
                        }
                    },
                    account_number: true,
                    bank_account_type: true,
                }
            },
            amount: true,
            transaction_date: true,
        }
    });

    if (!transferTrx) {
        throw new ResponseError(404, "Not Found", "Bank account not found");
    }
    return transferTrx;
}

module.exports = {
    createTransferTransactionService,
    getTransferTransactionByIdService,
    getAllTransferTransactionsService,
    getTransferTransactionsBySenderService,
    getTransferTransactionsByReceiverService,
};
