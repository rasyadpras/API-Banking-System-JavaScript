const express = require('express');
const router = express.Router();
const {
  addAccount,
  getAccounts,
  getAccountbyId,
  updateAccount,
} = require('../controllers/account');
const { validateAcc } = require('../middlewares/validator/account');

router.post('/', validateAcc, addAccount);
router.get('/', getAccounts);
router.get('/:id', getAccountbyId);
router.put('/:id', updateAccount);

module.exports = router;
