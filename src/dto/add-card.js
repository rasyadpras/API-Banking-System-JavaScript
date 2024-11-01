class AddCard {
    constructor(
        bank_account_id,
        card_type,
        card_number,
        principal,
        expired_date,
        cvv
    ) {
        this.bank_account_id = bank_account_id;
        this.card_type = card_type;
        this.card_number = card_number;
        this.principal = principal;
        this.expired_date = expired_date;
        this.cvv = cvv;
    }
}

module.exports = AddCard;
