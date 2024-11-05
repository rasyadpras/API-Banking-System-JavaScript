const { PrismaClient, CardStatus, BankAccountStatus } = require("@prisma/client");
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
    if (bankAccount.status_bank_account === BankAccountStatus.closed) {
        throw new ResponseError(400, "Bad Request", "This bank account is closed");
    }

    const card = await prisma.cards.create({
        data: {
            bank_account: { connect: { id: bank_account_id } },
            card_type: inputCardType(card_type),
            card_number: formatCardNumber(card_number),
            principal: inputCardPrincipal(principal),
            expired_date: convertToExpiryDate(expired_date),
            cvv,
        },
    });

    return prisma.cards.findUnique({
        where: { id: card.id },
        include: {
            bank_account: {
                include: {
                    profile: true,
                }
            }
        }
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
            card_status: true,
            active_date: true,
            updated_at: true,
        }
    });

    if (!card) {
        throw new ResponseError(404, "Not Found", "Card not found");
    }
    return card;
}

async function unblockCardService(id) {
    const card = await prisma.cards.findUnique({ where: { id } });
    if (!card) {
        throw new ResponseError(404, "Not Found", "Card not found");
    }

    if (card.card_status === CardStatus.active) {
        throw new ResponseError(400, "Bad Request", "Card is already active");
    }

    if (card.card_status === CardStatus.expired) {
        throw new ResponseError(400, "Bad Request", "Your card is expired");
    }

    return prisma.cards.update({
        where: { id },
        data: { card_status: CardStatus.active }
    });
}

module.exports = { addCardService, getCardByIdService, unblockCardService };
