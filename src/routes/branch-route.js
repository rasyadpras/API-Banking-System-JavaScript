const express = require("express");
const router = express.Router();
const {
    createBranch,
    getAllBranches,
    updateBranch,
} = require("../controllers/branch-controller");
const { validateCreateBranch, validateUpdateBranch } = require("../validations/branch-validator");

router.post("/", validateCreateBranch, createBranch);
router.get("/", getAllBranches);
router.patch("/:id", validateUpdateBranch, updateBranch);

module.exports = router;
