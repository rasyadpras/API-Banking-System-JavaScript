const express = require("express");
const morgan = require("morgan");
const router = express.Router();

const authRoute = require("./auth-route");
const profileRoute = require("./profile-route");
const accRoute = require("./bank-account-route");
const trxRoute = require("./transfer-route");
const branchRoute = require("./branch-route");
const cardRoute = require("./card-route");

router.use(morgan("dev"));

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/profiles", profileRoute);
router.use("/api/v1/bank-accounts", accRoute);
router.use("/api/v1/transactions", trxRoute);
router.use("/api/v1/branches", branchRoute);
router.use("/api/v1/cards", cardRoute);

module.exports = router;
