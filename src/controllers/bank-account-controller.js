const {
    createBankAccountService,
    getBankAccountByIdService,
    deleteBankAccountService,
} = require("../services/bank-account-service");
const CreateBankAccountRequest = require("../dto/create-bank-account");
const ResponseSuccess = require("../responses/response-success");
const ResponseError = require("../responses/response-error");

async function createBankAccount(req, res) {
    try {
        const createBankAccountReq = new CreateBankAccountRequest(
            req.body.branch_id,
            req.body.profile_id,
            req.body.type,
        );

        const bankAccount = await createBankAccountService(createBankAccountReq);
        const resp = new ResponseSuccess(
            201,
            "Created",
            {
                id: bankAccount.id,
                branch: {
                    branchId: bankAccount.branch.id,
                    code: bankAccount.branch.branch_code,
                    branchName: bankAccount.branch.branch_name,
                    region: bankAccount.branch.region,
                    address: bankAccount.branch.address,
                },
                profile: {
                    profileId: bankAccount.profile.id,
                    fullName: bankAccount.profile.full_name,
                    gender: bankAccount.profile.gender,
                    birthDate: bankAccount.profile.birth_date,
                    identityType: bankAccount.profile.identity_type,
                    identityNumber: bankAccount.profile.identity_number,
                    address: bankAccount.profile.address,
                    city: bankAccount.profile.city,
                    province: bankAccount.profile.province,
                    country: bankAccount.profile.country,
                    phoneNumber: bankAccount.profile.phone_number,
                    user: {
                        userId: bankAccount.profile.user.id,
                        email: bankAccount.profile.user.email,
                        createdAt: bankAccount.profile.user.created_at,
                        updatedAt: bankAccount.profile.user.updated_at,
                    },
                    created_at: bankAccount.profile.created_at,
                    updated_at: bankAccount.profile.updated_at,
                },
                accountNumber: bankAccount.account_number,
                bankAccountType: bankAccount.bank_account_type,
                balance: bankAccount.balance,
                statusBankAccount: bankAccount.status_bank_account,
                cards: bankAccount.cards.map(card => ({
                    cardId: card.id,
                    cardType: card.card_type,
                    cardNumber: card.card_number,
                    principal: card.principal,
                    validThru: card.expired_date,
                    cardStatus: card.status_card,
                })),
                created_at: bankAccount.created_at,
                updated_at: bankAccount.updated_at,
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

async function getBankAccountById(req, res) {
    try {
        const { id } = req.params;
        const bankAccount = await getBankAccountByIdService(id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            {
                id: bankAccount.id,
                branch: {
                    branchId: bankAccount.branch.id,
                    code: bankAccount.branch.branch_code,
                    branchName: bankAccount.branch.branch_name,
                    region: bankAccount.branch.region,
                    address: bankAccount.branch.address,
                },
                profile: {
                    profileId: bankAccount.profile.id,
                    fullName: bankAccount.profile.full_name,
                    gender: bankAccount.profile.gender,
                    birthDate: bankAccount.profile.birth_date,
                    identityType: bankAccount.profile.identity_type,
                    identityNumber: bankAccount.profile.identity_number,
                    address: bankAccount.profile.address,
                    city: bankAccount.profile.city,
                    province: bankAccount.profile.province,
                    country: bankAccount.profile.country,
                    phoneNumber: bankAccount.profile.phone_number,
                    user: {
                        userId: bankAccount.profile.user.id,
                        email: bankAccount.profile.user.email,
                        createdAt: bankAccount.profile.user.created_at,
                        updatedAt: bankAccount.profile.user.updated_at,
                    },
                    created_at: bankAccount.profile.created_at,
                    updated_at: bankAccount.profile.updated_at,
                },
                accountNumber: bankAccount.account_number,
                bankAccountType: bankAccount.bank_account_type,
                balance: bankAccount.balance,
                statusBankAccount: bankAccount.status_bank_account,
                cards: bankAccount.cards.map(card => ({
                    cardId: card.id,
                    cardType: card.card_type,
                    cardNumber: card.card_number,
                    principal: card.principal,
                    validThru: card.expired_date,
                    cardStatus: card.status_card,
                })),
                created_at: bankAccount.created_at,
                updated_at: bankAccount.updated_at,
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

async function deleteBankAccount(req, res) {
    try {
        const { id } = req.params;
        await deleteBankAccountService(id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            "Account closed"
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

module.exports = { createBankAccount, getBankAccountById, deleteBankAccount };
