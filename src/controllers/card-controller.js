const {
    addCardService,
    getCardByIdService,
    unblockCardService,
} = require("../services/card-service");
const AddCardRequest = require("../dto/add-card");
const ResponseSuccess = require("../responses/response-success");
const ResponseError = require("../responses/response-error");

async function addCard(req, res) {
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
                cardId: card.id,
                bankAccount: {
                    bankAccountId: card.bank_account.id,
                    profile: {
                        profileId: card.bank_account.profile.id,
                        fullName: card.bank_account.profile.full_name,
                        gender: card.bank_account.profile.gender,
                        birthDate: card.bank_account.profile.birth_date,
                        identityType: card.bank_account.profile.identity_type,
                        identityNumber: card.bank_account.profile.identity_number,
                    },
                    accountNumber: card.bank_account.account_number,
                    bankAccountType: card.bank_account.bank_account_type,
                    bankAccountStatus: card.bank_account.status_bank_account,
                    createdAt: card.bank_account.created_at,
                    updatedAt: card.bank_account.updated_at,
                },
                cardType: card.card_type,
                cardNumber: card.card_number,
                principal: card.principal,
                validThru: card.expired_date,
                cvv: card.cvv,
                cardStatus: card.status_card,
                activeDate: card.active_date,
                createdAt: card.created_at,
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

async function getCardById(req, res) {
    try {
        const { id } = req.params;
        const card = await getCardByIdService(id);
        const resp = new ResponseSuccess(
            200,
            "OK",
            {
                cardId: card.id,
                bankAccount: {
                    bankAccountId: card.bank_account.id,
                    profile: {
                        profileId: card.bank_account.profile.id,
                        fullName: card.bank_account.profile.full_name,
                        gender: card.bank_account.profile.gender,
                        birthDate: card.bank_account.profile.birth_date,
                        identityType: card.bank_account.profile.identity_type,
                        identityNumber: card.bank_account.profile.identity_number,
                    },
                    accountNumber: card.bank_account.account_number,
                    bankAccountType: card.bank_account.bank_account_type,
                    bankAccountStatus: card.bank_account.status_bank_account,
                    createdAt: card.bank_account.created_at,
                    updatedAt: card.bank_account.updated_at,
                },
                cardType: card.card_type,
                cardNumber: card.card_number,
                principal: card.principal,
                validThru: card.expired_date,
                cvv: card.cvv,
                cardStatus: card.status_card,
                activeDate: card.active_date,
                createdAt: card.created_at,
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

async function unblockCard(req, res) {
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

module.exports = { addCard, getCardById, unblockCard };
