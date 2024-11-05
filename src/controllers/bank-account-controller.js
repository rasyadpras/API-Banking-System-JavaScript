const {
    createBankAccountService,
    getBankAccountByIdService,
    deleteBankAccountService,
} = require("../services/bank-account-service");
const CreateBankAccountRequest = require("../dto/create-bank-account");
const ResponseSuccess = require("../responses/response-success");

async function createBankAccount(req, res, next) {
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
                    branch_id: bankAccount.branch.id,
                    code: bankAccount.branch.branch_code,
                    branch_name: bankAccount.branch.branch_name,
                    region: bankAccount.branch.region,
                    address: bankAccount.branch.address,
                },
                profile: {
                    profile_id: bankAccount.profile.id,
                    full_name: bankAccount.profile.full_name,
                    gender: bankAccount.profile.gender,
                    birth_date: bankAccount.profile.birth_date,
                    identity_type: bankAccount.profile.identity_type,
                    identity_number: bankAccount.profile.identity_number,
                    address: bankAccount.profile.address,
                    city: bankAccount.profile.city,
                    province: bankAccount.profile.province,
                    country: bankAccount.profile.country,
                    phone_number: bankAccount.profile.phone_number,
                    user: {
                        user_id: bankAccount.profile.user.id,
                        email: bankAccount.profile.user.email,
                        created_at: bankAccount.profile.user.created_at,
                        updated_at: bankAccount.profile.user.updated_at,
                    },
                    created_at: bankAccount.profile.created_at,
                    updated_at: bankAccount.profile.updated_at,
                },
                account_number: bankAccount.account_number,
                bank_account_type: bankAccount.bank_account_type,
                balance: bankAccount.balance,
                status_bank_account: bankAccount.status_bank_account,
                cards: bankAccount.cards.map(card => ({
                    card_id: card.id,
                    card_type: card.card_type,
                    card_number: card.card_number,
                    principal: card.principal,
                    valid_thru: card.expired_date,
                    card_status: card.card_status,
                })),
                created_at: bankAccount.created_at,
                updated_at: bankAccount.updated_at,
            }
        );
        return res.status(201).json(resp);
    } catch (e) {
        next(e);
    }
}

async function getBankAccountById(req, res, next) {
    try {
        const { id } = req.params;
        const bankAccount = await getBankAccountByIdService(id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            {
                id: bankAccount.id,
                branch: {
                    branch_id: bankAccount.branch.id,
                    code: bankAccount.branch.branch_code,
                    branch_name: bankAccount.branch.branch_name,
                    region: bankAccount.branch.region,
                    address: bankAccount.branch.address,
                },
                profile: {
                    profile_id: bankAccount.profile.id,
                    full_name: bankAccount.profile.full_name,
                    gender: bankAccount.profile.gender,
                    birth_date: bankAccount.profile.birth_date,
                    identity_type: bankAccount.profile.identity_type,
                    identity_number: bankAccount.profile.identity_number,
                    address: bankAccount.profile.address,
                    city: bankAccount.profile.city,
                    province: bankAccount.profile.province,
                    country: bankAccount.profile.country,
                    phone_number: bankAccount.profile.phone_number,
                    user: {
                        user_id: bankAccount.profile.user.id,
                        email: bankAccount.profile.user.email,
                        created_at: bankAccount.profile.user.created_at,
                        updated_at: bankAccount.profile.user.updated_at,
                    },
                    created_at: bankAccount.profile.created_at,
                    updated_at: bankAccount.profile.updated_at,
                },
                account_number: bankAccount.account_number,
                bank_account_type: bankAccount.bank_account_type,
                balance: bankAccount.balance,
                status_bank_account: bankAccount.status_bank_account,
                cards: bankAccount.cards.map(card => ({
                    card_id: card.id,
                    card_type: card.card_type,
                    card_number: card.card_number,
                    principal: card.principal,
                    valid_thru: card.expired_date,
                    card_status: card.card_status,
                })),
                created_at: bankAccount.created_at,
                updated_at: bankAccount.updated_at,
            }
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

async function deleteBankAccount(req, res, next) {
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
        next(e);
    }
}

module.exports = { createBankAccount, getBankAccountById, deleteBankAccount };
