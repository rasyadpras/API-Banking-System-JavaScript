const { PrismaClient, BankAccountStatus, TransactionCashType } = require("@prisma/client");
const ResponseError = require("../responses/response-error");
const prisma = new PrismaClient();

async function createDepositTransactionService(createCashTransactionReq) {
    const { account_number, amount } = createCashTransactionReq;

    const account = await prisma.bank_accounts.findUnique({ where: { account_number } });
    if (!account) {
        throw new ResponseError(404, "Not Found", "Bank account number not found");
    }
    if (account.status_bank_account === BankAccountStatus.closed) {
        throw new ResponseError(400, "Bad Request", "This account is closed");
    }

    await prisma.bank_accounts.update({
        where: { account_number },
        data: { balance: account.balance + amount }
    });

    return prisma.cash_transactions.create({
        data: {
            bank_account: { connect: { account_number } },
            type: TransactionCashType.deposit,
            amount,
        },
    });
}

async function createWithdrawalTransactionService(createCashTransactionReq) {
    const { account_number, amount } = createCashTransactionReq;

    const account = await prisma.bank_accounts.findUnique({ where: { account_number } });
    if (!account) {
        throw new ResponseError(404, "Not Found", "Account not found");
    }
    if (account.status_bank_account === BankAccountStatus.closed) {
        throw new ResponseError(400, "Bad Request", "This account is closed");
    }

    if (account.balance < amount) {
        throw new ResponseError(400, "Bad Request", "Insufficient balance");
    }
    await prisma.bank_accounts.update({
        where: { account_number },
        data: { balance: account.balance - amount }
    });

    return prisma.cash_transactions.create({
        data: {
            bank_account: { connect: { account_number } },
            type: TransactionCashType.withdrawal,
            amount,
        },
    });
}

async function getCashTransactionByIdService(id) {
    const cashTrx = await prisma.cash_transactions.findUnique({
        where: { id },
        select: {
            id: true,
            bank_account: {
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
            transaction_type: true,
            amount: true,
            transaction_date: true,
        }
    });

    if (!cashTrx) {
        throw new ResponseError(404, "Not Found", "Transaction not found");
    }
    return cashTrx;
}

async function getAllCashTransactionsService(bank_acc_id) {
    const cashTrx = await prisma.cash_transactions.findMany({
        where: {
            bank_account_id: bank_acc_id,
        },
        orderBy: {
            id: "asc",
        },
        select: {
            id: true,
            bank_account: {
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
            transaction_type: true,
            amount: true,
            transaction_date: true,
        }
    });

    if (!cashTrx) {
        throw new ResponseError(404, "Not Found", "Bank account not found");
    }
    return cashTrx;
}

module.exports = {
    createDepositTransactionService,
    createWithdrawalTransactionService,
    getCashTransactionByIdService,
    getAllCashTransactionsService,
};
