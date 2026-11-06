const express = require("express");
const { register, login, getMe, updateProfile } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me/:userId", getMe);
router.put("/profile/:userId", updateProfile);

module.exports = router;

