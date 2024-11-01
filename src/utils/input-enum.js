const { Gender, IdentityType, BankAccountType, CardType, CardPrincipal } = require("@prisma/client");
const ResponseError = require("../responses/response-error");

function inputGender(gender) {
    switch (gender.toLowerCase()) {
    case "male":
        return Gender.male;
    case "female":
        return Gender.female;
    default:
        throw new ResponseError(400, "Bad Request", "Value of gender must be 'male' or 'female'");
    }
}

function inputIdentityType(identity_type) {
    switch (identity_type.toLowerCase()) {
    case "id card":
    case "ktp":
        return IdentityType.identity_card;
    case "passport":
        return IdentityType.passport;
    case "driver license":
        return IdentityType.driver_lisence;
    case "student card":
        return IdentityType.student_card;
    case "other":
        return IdentityType.other;
    default:
        throw new ResponseError(400, "Bad Request", "Valid value is 'id card', 'ktp', 'passport', 'driver license', 'student card', or 'other'");
    }
}

function inputBankAccountType(type) {
    switch (type.toLowerCase()) {
    case "regular":
        return BankAccountType.regular_savings;
    case "business":
        return BankAccountType.business_savings;
    case "student":
        return BankAccountType.student_savings;
    case "plan":
        return BankAccountType.savings_plan;
    case "other":
        return BankAccountType.other_savings;
    default:
        throw new ResponseError(
            400, "Bad Request", "Bank account type must be 'regular', 'business', 'student', 'plan', or 'other'"
        );
    }
}

function inputCardType(type) {
    switch (type.toLowerCase()) {
    case "debit":
        return CardType.debit_card;
    case "credit":
        return CardType.credit_card;
    default:
        throw new ResponseError(400, "Bad Request", "Card type must be 'debit' or 'credit'");
    }
}

function inputCardPrincipal(principal) {
    switch (principal.toLowerCase()) {
    case "visa":
        return CardPrincipal.visa;
    case "mastercard":
        return CardPrincipal.mastercard;
    case "gpn":
        return CardPrincipal.gpn;
    case "jcb":
        return CardPrincipal.jcb;
    case "union":
        return CardPrincipal.union_pay;
    case "amex":
        return CardPrincipal.american_express;
    case "none":
        return CardPrincipal.no_principal;
    case "other":
        return CardPrincipal.other;
    default:
        throw new ResponseError(400, "Bad Request", "Card principal must be 'visa', 'mastercard', 'gpn', 'jcb', 'union', 'amex', 'none', or 'other'");
    }
}

module.exports = { inputGender, inputIdentityType, inputBankAccountType, inputCardType, inputCardPrincipal };
