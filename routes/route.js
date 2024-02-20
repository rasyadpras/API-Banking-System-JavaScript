const express = require('express');
const morgan = require('morgan');
const router = express.Router();

const userRoute = require('./user');
const accRoute = require('./account');
const trxRoute = require('./transaction');

router.use(morgan('dev'));

router.use('/api/v1/users', userRoute);
router.use('./api/v1/accounts', accRoute);
router.use('./api/v1/transactions', trxRoute);

module.exports = router;
