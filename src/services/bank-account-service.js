const { PrismaClient, BankAccountStatus } = require("@prisma/client");
const ResponseError = require("../responses/response-error");
const { inputBankAccountType } = require("../utils/input-enum");
const prisma = new PrismaClient();

function generateBankAccountNumber(branchCode) {
    const date = new Date();
    const monthYear = `${(date.getMonth() + 1).toString().padStart(2, "0")}${
        date.getFullYear().toString().slice(-2)
    }`;
    const hashedMonthYear = Math.abs(
        [...monthYear].reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0) % 10000,
    ).toString().padStart(4, "0");

    const sequence = { count: 1 };
    const sequenceNumber = (sequence.count++ % 1000).toString().padStart(3, "0");

    return branchCode + hashedMonthYear + sequenceNumber;
}

async function createBankAccountService(createBankAccReq) {
    const { branch_id, profile_id, type } = createBankAccReq;

    const branch = await prisma.bank_branches.findUnique({ where: { id: branch_id } });
    if (!branch) {
        throw new ResponseError(404, "Not Found", "Branch not found");
    }

    const profile = await prisma.profiles.findUnique({ where: { id: profile_id } });
    if (!profile) {
        throw new ResponseError(404, "Not Found", "Profile not found");
    }

    return prisma.bank_accounts.create({
        data: {
            branch: { connect: { id: branch_id } },
            profile: { connect: { id: profile_id } },
            account_number: generateBankAccountNumber(branch_id),
            type: inputBankAccountType(type),
            balance: 0,
            status_bank_account: BankAccountStatus.active,
        },
    });
}

function getBankAccountByIdService(id) {
    const bankAccount = prisma.bank_accounts.findUnique({
        where: { id },
        select: {
            id: true,
            branch: {
                select: {
                    id: true,
                    branch_code: true,
                    branch_name: true,
                    region: true,
                    address: true,
                }
            },
            profile: {
                select: {
                    id: true,
                    full_name: true,
                    gender: true,
                    birth_date: true,
                    identity_type: true,
                    identity_number: true,
                    address: true,
                    city: true,
                    province: true,
                    country: true,
                    phone_number: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            created_at: true,
                            updated_at: true,
                        }
                    },
                    created_at: true,
                    updated_at: true,
                }
            },
            account_number: true,
            bank_account_type: true,
            balance: true,
            status_bank_account: true,
            cards: {
                select: {
                    id: true,
                    card_type: true,
                    card_number: true,
                    principal: true,
                    expired_date: true,
                    status_card: true,
                }
            },
            created_at: true,
            updated_at: true,
        }
    });

    if (!bankAccount) {
        throw new ResponseError(404, "Not Found", "Bank account not found");
    }
    return bankAccount;
}

async function deleteBankAccountService(id) {
    const bankAccount = await prisma.bank_accounts.findUnique({ where: { id } });
    if (!bankAccount) {
        throw new ResponseError(404, "Not Found", "Bank account not found");
    }

    return prisma.bank_accounts.update({
        where: { id },
        data: {
            status_bank_account: BankAccountStatus.closed,
        },
    });
}

module.exports = { createBankAccountService, getBankAccountByIdService, deleteBankAccountService };
