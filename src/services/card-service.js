const { PrismaClient, CardStatus } = require("@prisma/client");
const ResponseError = require("../responses/response-error");
const { inputCardType, inputCardPrincipal } = require("../utils/input-enum");
const { convertToExpiryDate, formatCardNumber } = require("../utils/converter");
const prisma = new PrismaClient();

async function addCardService(addCardReq) {
    const { bank_account_id, card_type, card_number, principal, expired_date, cvv } = addCardReq;

    const bankAccount = await prisma.bank_accounts.findUnique({ where: { id: bank_account_id } });
    if (!bankAccount) {
        throw new ResponseError(404, "Not Found", "Bank account not found");
    }

    return prisma.cards.create({
        data: {
            bank_account: { connect: { id: bank_account_id } },
            card_type: inputCardType(card_type),
            card_number: formatCardNumber(card_number),
            principal: inputCardPrincipal(principal),
            expired_date: convertToExpiryDate(expired_date),
            cvv,
        },
    });
}

async function getCardByIdService(id) {
    const card = await prisma.cards.findUnique({
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
                            gender: true,
                            birth_date: true,
                            identity_type: true,
                            identity_number: true,
                        }
                    },
                    account_number: true,
                    bank_account_type: true,
                    status_bank_account: true,
                    created_at: true,
                    updated_at: true,
                }
            },
            card_type: true,
            card_number: true,
            principal: true,
            expired_date: true,
            cvv: true,
            status_card: true,
            active_date: true,
            created_at: true,
        }
    });

    if (!card) {
        throw new ResponseError(404, "Not Found", "Card not found");
    }
    return card;
}

function unblockCardService(id) {
    const card = prisma.cards.findUnique({ where: { id } });
    if (!card) {
        throw new ResponseError(404, "Not Found", "Card not found");
    }

    if (card.status_card === CardStatus.active) {
        throw new ResponseError(400, "Bad Request", "Card is already active");
    }

    if (card.status_card === CardStatus.expired) {
        throw new ResponseError(400, "Bad Request", "Your card is expired");
    }

    return prisma.cards.update({
        where: { id },
        data: { status_card: CardStatus.active }
    });
}

module.exports = { addCardService, getCardByIdService, unblockCardService };
