const express = require("express");
const router = express.Router();
const {
    getAllProfiles,
    getProfileById,
    updateProfile,
} = require("../controllers/profile-controller");
const { validateUpdateProfile } = require("../validations/profile-validator");

router.get("/", getAllProfiles);
router.get("/:id", getProfileById);
router.put("/:id", validateUpdateProfile, updateProfile);

module.exports = router;
