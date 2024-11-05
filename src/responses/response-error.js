class ResponseError extends Error {
    constructor(status_code, message, error) {
        super(message);
        this.status_code = status_code;
        this.error = error;
    }
}

module.exports = ResponseError;
