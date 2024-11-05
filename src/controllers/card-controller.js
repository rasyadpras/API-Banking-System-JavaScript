const {
    addCardService,
    getCardByIdService,
    unblockCardService,
} = require("../services/card-service");
const AddCardRequest = require("../dto/add-card");
const ResponseSuccess = require("../responses/response-success");

async function addCard(req, res, next) {
    try {
        const addCardReq = new AddCardRequest(
            req.body.bank_account_id,
            req.body.card_type,
            req.body.card_number,
            req.body.principal,
            req.body.expired_date,
            req.body.cvv
        );

        const card = await addCardService(addCardReq);
        const resp = new ResponseSuccess(
            201,
            "Created",
            {
                id: card.id,
                bank_account: {
                    bank_account_id: card.bank_account.id,
                    profile: {
                        profile_id: card.bank_account.profile.id,
                        full_name: card.bank_account.profile.full_name,
                        gender: card.bank_account.profile.gender,
                        birth_date: card.bank_account.profile.birth_date,
                        identity_type: card.bank_account.profile.identity_type,
                        identity_number: card.bank_account.profile.identity_number,
                    },
                    account_number: card.bank_account.account_number,
                    bank_account_type: card.bank_account.bank_account_type,
                    bank_account_status: card.bank_account.status_bank_account,
                    created_at: card.bank_account.created_at,
                    updated_at: card.bank_account.updated_at,
                },
                card_type: card.card_type,
                card_number: card.card_number,
                principal: card.principal,
                valid_thru: card.expired_date,
                cvv: card.cvv,
                card_status: card.card_status,
                active_date: card.active_date,
                updated_at: card.updated_at,
            }
        );
        return res.status(201).json(resp);
    } catch (e) {
        next(e);
    }
}

async function getCardById(req, res, next) {
    try {
        const { id } = req.params;
        const card = await getCardByIdService(id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            {
                id: card.id,
                bank_account: {
                    bank_account_id: card.bank_account.id,
                    profile: {
                        profile_id: card.bank_account.profile.id,
                        full_name: card.bank_account.profile.full_name,
                        gender: card.bank_account.profile.gender,
                        birth_date: card.bank_account.profile.birth_date,
                        identity_type: card.bank_account.profile.identity_type,
                        identity_number: card.bank_account.profile.identity_number,
                    },
                    account_number: card.bank_account.account_number,
                    bank_account_type: card.bank_account.bank_account_type,
                    bank_account_status: card.bank_account.status_bank_account,
                    created_at: card.bank_account.created_at,
                    updated_at: card.bank_account.updated_at,
                },
                card_type: card.card_type,
                card_number: card.card_number,
                principal: card.principal,
                valid_thru: card.expired_date,
                cvv: card.cvv,
                card_status: card.card_status,
                active_date: card.active_date,
                updated_at: card.updated_at,
            }
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

async function unblockCard(req, res, next) {
    try {
        const { id } = req.params;
        await unblockCardService(id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            "Card has been activated"
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

module.exports = { addCard, getCardById, unblockCard };
