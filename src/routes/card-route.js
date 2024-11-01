const express = require("express");
const router = express.Router();
const {
    addCard,
    getCardById,
    unblockCard,
} = require("../controllers/card-controller");
const { validateCreateCard } = require("../validations/card-validator");

router.post("/", validateCreateCard, addCard);
router.get("/:id", getCardById);
router.patch("/:id/unblock", unblockCard);

module.exports = router;
