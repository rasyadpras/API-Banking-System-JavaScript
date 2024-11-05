const {
    getAllProfilesService,
    getProfileByIdService,
    updateProfileService,
} = require("../services/profile-service");
const UpdateProfileRequest = require("../dto/update-profile");
const ResponseSuccess = require("../responses/response-success");

async function getAllProfiles(req, res, next) {
    try {
        const { city } = req.query;
        const profiles = await getAllProfilesService(city);
        const resp = new ResponseSuccess(
            200,
            "OK",
            profiles.map(profile => ({
                profile_id: profile.id,
                full_name: profile.full_name,
                gender: profile.gender,
                birth_date: profile.birth_date,
                identity_type: profile.identity_type,
                identity_number: profile.identity_number,
                address: profile.address,
                city: profile.city,
                province: profile.province,
                country: profile.country,
                phone_number: profile.phone_number,
                user: {
                    user_id: profile.user.id,
                    email: profile.user.email,
                    account_user_status: profile.user.status_account,
                    roles: profile.user.roles.map(role => role.role),
                    created_at: profile.user.created_at,
                    updated_at: profile.user.updated_at,
                },
                bank_accounts: profile.bank_accounts.map(bankAccount => ({
                    account_id: bankAccount.id,
                    branch: {
                        branch_id: bankAccount.branch.id,
                        code: bankAccount.branch.branch_code,
                        branch_name: bankAccount.branch.branch_name,
                        region: bankAccount.branch.region,
                        address: bankAccount.branch.address,
                    },
                    account_number: bankAccount.account_number,
                    bank_account_type: bankAccount.bank_account_type,
                    bank_account_status: bankAccount.status_bank_account,
                    cards: bankAccount.cards.map(card => ({
                        card_id: card.id,
                        card_type: card.card_type,
                        card_number: card.card_number,
                        principal: card.principal,
                        card_status: card.card_status,
                    })),
                    created_at: bankAccount.created_at,
                    updated_at: bankAccount.updated_at,
                })),
                created_at: profile.created_at,
                updated_at: profile.updated_at,
            }))
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

async function getProfileById(req, res, next) {
    try {
        const { id } = req.params;
        const profile = await getProfileByIdService(id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            {
                profile_id: profile.id,
                full_name: profile.full_name,
                gender: profile.gender,
                birth_date: profile.birth_date,
                identity_type: profile.identity_type,
                identity_number: profile.identity_number,
                address: profile.address,
                city: profile.city,
                province: profile.province,
                country: profile.country,
                phone_number: profile.phone_number,
                user: {
                    user_id: profile.user.id,
                    email: profile.user.email,
                    account_user_status: profile.user.status_account,
                    roles: profile.user.roles.map(role => role.role),
                    created_at: profile.user.created_at,
                    updated_at: profile.user.updated_at,
                },
                bank_accounts: profile.bank_accounts.map(bankAccount => ({
                    account_id: bankAccount.id,
                    branch: {
                        branch_id: bankAccount.branch.id,
                        code: bankAccount.branch.branch_code,
                        branch_name: bankAccount.branch.branch_name,
                        region: bankAccount.branch.region,
                        address: bankAccount.branch.address,
                    },
                    account_number: bankAccount.account_number,
                    bank_account_type: bankAccount.bank_account_type,
                    bank_account_status: bankAccount.status_bank_account,
                    cards: bankAccount.cards.map(card => ({
                        card_id: card.id,
                        card_type: card.card_type,
                        card_number: card.card_number,
                        principal: card.principal,
                        card_status: card.card_status,
                    })),
                    created_at: bankAccount.created_at,
                    updated_at: bankAccount.updated_at,
                })),
                created_at: profile.created_at,
                updated_at: profile.updated_at,
            }
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

async function updateProfile(req, res, next) {
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
                profile_id: profile.id,
                full_name: profile.full_name,
                gender: profile.gender,
                birth_date: profile.birth_date,
                identity_type: profile.identity_type,
                identity_number: profile.identity_number,
                address: profile.address,
                city: profile.city,
                province: profile.province,
                country: profile.country,
                phone_number: profile.phone_number,
                user: {
                    user_id: profile.user.id,
                    email: profile.user.email,
                    account_user_status: profile.user.status_account,
                    roles: profile.user.roles.map(role => role.role),
                    created_at: profile.user.created_at,
                    updated_at: profile.user.updated_at,
                },
                bank_accounts: profile.bank_accounts.map(bankAccount => ({
                    account_id: bankAccount.id,
                    branch: {
                        branch_id: bankAccount.branch.id,
                        code: bankAccount.branch.branch_code,
                        branch_name: bankAccount.branch.branch_name,
                        region: bankAccount.branch.region,
                        address: bankAccount.branch.address,
                    },
                    account_number: bankAccount.account_number,
                    bank_account_type: bankAccount.bank_account_type,
                    bank_account_status: bankAccount.status_bank_account,
                    cards: bankAccount.cards.map(card => ({
                        card_id: card.id,
                        card_type: card.card_type,
                        card_number: card.card_number,
                        principal: card.principal,
                        card_status: card.card_status,
                    })),
                    created_at: bankAccount.created_at,
                    updated_at: bankAccount.updated_at,
                })),
                created_at: profile.created_at,
                updated_at: profile.updated_at,
            }
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

module.exports = { getAllProfiles, getProfileById, updateProfile };
