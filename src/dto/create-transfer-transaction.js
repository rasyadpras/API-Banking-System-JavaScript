class CreateTransferTransaction {
    constructor(source_account_number, destination_account_number, amount) {
        this.source_account_number = source_account_number;
        this.destination_account_number = destination_account_number;
        this.amount = amount;
    }
}

module.exports = CreateTransferTransaction;
