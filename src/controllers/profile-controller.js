const {
    getAllProfilesService,
    getProfileByIdService,
    updateProfileService,
} = require("../services/profile-service");
const UpdateProfileRequest = require("../dto/update-profile");
const ResponseSuccess = require("../responses/response-success");
const ResponseError = require("../responses/response-error");

async function getAllProfiles(req, res) {
    try {
        const { city } = req.query;
        const profiles = await getAllProfilesService(city);
        const resp = new ResponseSuccess(
            200,
            "OK",
            profiles.map(profile => ({
                profileId: profile.id,
                fullName: profile.full_name,
                gender: profile.gender,
                birthDate: profile.birth_date,
                identityType: profile.identity_type,
                identityNumber: profile.identity_number,
                address: profile.address,
                city: profile.city,
                province: profile.province,
                country: profile.country,
                phoneNumber: profile.phone_number,
                user: {
                    userId: profile.user.id,
                    email: profile.user.email,
                    accountUserStatus: profile.user.status_account,
                    roles: profile.user.roles.map(role => role.role),
                    createdAt: profile.user.created_at,
                    updatedAt: profile.user.updated_at,
                },
                bankAccounts: profile.bank_accounts.map(bankAccount => ({
                    accountId: bankAccount.id,
                    branch: {
                        branchId: bankAccount.branch.id,
                        code: bankAccount.branch.branch_code,
                        branchName: bankAccount.branch.branch_name,
                        region: bankAccount.branch.region,
                        address: bankAccount.branch.address,
                    },
                    accountNumber: bankAccount.account_number,
                    bankAccountType: bankAccount.bank_account_type,
                    bankAccountStatus: bankAccount.status_bank_account,
                    cards: bankAccount.cards.map(card => ({
                        cardId: card.id,
                        cardType: card.card_type,
                        cardNumber: card.card_number,
                        principal: card.principal,
                        cardStatus: card.card_status,
                    })),
                    createdAt: bankAccount.created_at,
                    updatedAt: bankAccount.updated_at,
                })),
                createdAt: profile.created_at,
                updatedAt: profile.updated_at,
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

async function getProfileById(req, res) {
    try {
        const { id } = req.params;
        const profile = await getProfileByIdService(id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            {
                profileId: profile.id,
                fullName: profile.full_name,
                gender: profile.gender,
                birthDate: profile.birth_date,
                identityType: profile.identity_type,
                identityNumber: profile.identity_number,
                address: profile.address,
                city: profile.city,
                province: profile.province,
                country: profile.country,
                phoneNumber: profile.phone_number,
                user: {
                    userId: profile.user.id,
                    email: profile.user.email,
                    accountUserStatus: profile.user.status_account,
                    roles: profile.user.roles.map(role => role.role),
                    createdAt: profile.user.created_at,
                    updatedAt: profile.user.updated_at,
                },
                bankAccounts: profile.bank_accounts.map(bankAccount => ({
                    accountId: bankAccount.id,
                    branch: {
                        branchId: bankAccount.branch.id,
                        code: bankAccount.branch.branch_code,
                        branchName: bankAccount.branch.branch_name,
                        region: bankAccount.branch.region,
                        address: bankAccount.branch.address,
                    },
                    accountNumber: bankAccount.account_number,
                    bankAccountType: bankAccount.bank_account_type,
                    bankAccountStatus: bankAccount.status_bank_account,
                    cards: bankAccount.cards.map(card => ({
                        cardId: card.id,
                        cardType: card.card_type,
                        cardNumber: card.card_number,
                        principal: card.principal,
                        cardStatus: card.card_status,
                    })),
                    createdAt: bankAccount.created_at,
                    updatedAt: bankAccount.updated_at,
                })),
                createdAt: profile.created_at,
                updatedAt: profile.updated_at,
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

async function updateProfile(req, res) {
    try {
        const { id } = req.params;
        const updateProfileReq = new UpdateProfileRequest(
            req.body.full_name,
            req.body.gender,
            req.body.birth_date,
            req.body.identity_type,
            req.body.identity_number,
            req.body.address,
            req.body.city,
            req.body.province,
            req.body.country,
            req.body.phone_number
        );

        const profile = await updateProfileService(id, updateProfileReq);
        const resp = new ResponseSuccess(
            200,
            "OK",
            {
                profileId: profile.id,
                fullName: profile.full_name,
                gender: profile.gender,
                birthDate: profile.birth_date,
                identityType: profile.identity_type,
                identityNumber: profile.identity_number,
                address: profile.address,
                city: profile.city,
                province: profile.province,
                country: profile.country,
                phoneNumber: profile.phone_number,
                user: {
                    userId: profile.user.id,
                    email: profile.user.email,
                    accountUserStatus: profile.user.status_account,
                    roles: profile.user.roles.map(role => role.role),
                    createdAt: profile.user.created_at,
                    updatedAt: profile.user.updated_at,
                },
                bankAccounts: profile.bank_accounts.map(bankAccount => ({
                    accountId: bankAccount.id,
                    branch: {
                        branchId: bankAccount.branch.id,
                        code: bankAccount.branch.branch_code,
                        branchName: bankAccount.branch.branch_name,
                        region: bankAccount.branch.region,
                        address: bankAccount.branch.address,
                    },
                    accountNumber: bankAccount.account_number,
                    bankAccountType: bankAccount.bank_account_type,
                    bankAccountStatus: bankAccount.status_bank_account,
                    cards: bankAccount.cards.map(card => ({
                        cardId: card.id,
                        cardType: card.card_type,
                        cardNumber: card.card_number,
                        principal: card.principal,
                        cardStatus: card.card_status,
                    })),
                    createdAt: bankAccount.created_at,
                    updatedAt: bankAccount.updated_at,
                })),
                createdAt: profile.created_at,
                updatedAt: profile.updated_at,
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

module.exports = { getAllProfiles, getProfileById, updateProfile };
