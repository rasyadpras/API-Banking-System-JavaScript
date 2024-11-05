const ResponseError = require("../responses/response-error");

async function errorHandler(e, req, res, next) {
    if (!e) {
        next();
    }

    if (e instanceof ResponseError) {
        return res.status(e.status_code).json({
            status_code: e.status_code,
            message: e.message,
            error: e.error
        });
    } else {
        return res.status(500).json({
            status_code: 500,
            message: "Internal Server Error",
            error: e.message
        });
    }
}

module.exports = { errorHandler };
