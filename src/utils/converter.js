const ResponseError = require("../responses/response-error");
const { DateTime } = require("luxon");

function convertToLocalDate(dateString) {
    const parsedDate = DateTime.fromFormat(dateString, "yyyy-MM-dd", { zone: "Asia/Jakarta" });
    if (!parsedDate.isValid) {
        throw new ResponseError(400, "Bad Request", "Convert failed. Invalid date format");
    }
    return parsedDate.toJSDate();
}

function convertToExpiryDate(dateString) {
    const EXP_FORMATTER = /^(\d{2})-(\d{2})$/;
    const match = EXP_FORMATTER.exec(dateString);

    const month = parseInt(match[1], 10);
    const year = parseInt(`20${match[2]}`, 10);

    const expiryDate = DateTime.fromObject({ year, month, day: 1 }, { zone: "Asia/Jakarta" });
    if (!expiryDate.isValid) {
        throw new ResponseError(400, "Bad Request", "Convert failed. Invalid expiry date format");
    }

    return expiryDate.toJSDate();
}

function formatCardNumber(cardNumber) {
    return cardNumber.replace(/(.{4})/g, "$1-").slice(0, 19);
}

module.exports = { convertToLocalDate, convertToExpiryDate, formatCardNumber };
