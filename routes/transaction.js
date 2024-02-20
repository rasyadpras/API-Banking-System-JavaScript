const express = require('express');
const router = express.Router();
const {
  addTransaction,
  getTransactions,
  getTransactionbyId,
} = require('../controllers/transaction');
const { validateTrx } = require('../middlewares/validator/transaction');

router.post('/', validateTrx, addTransaction);
router.get('/', getTransactions);
router.get('/:id', getTransactionbyId);

module.exports = router;
