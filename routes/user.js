const express = require('express');
const router = express.Router();
const {
  addUser,
  getUsers,
  getUserbyId,
  updateUser,
} = require('../controllers/user');
const { validateUser } = require('../middlewares/validator/user');

router.post('/', validateUser, addUser);
router.get('/', getUsers);
router.get('/:id', getUserbyId);
router.put('/:id', updateUser);

module.exports = router;
