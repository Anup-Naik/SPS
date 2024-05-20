const express = require("express");
const router = express.Router();
const { renderForgotPasswordForm, sendResetEmail, renderResetPasswordForm, resetPassword } = require("../controllers/forgotPasswordController");
const catchAsync = require("../utils/catchAsync");

router.get("/forgot-password", catchAsync(renderForgotPasswordForm));
router.post("/forgot-password", catchAsync(sendResetEmail));
router.get("/reset-password/:token", catchAsync(renderResetPasswordForm));
router.post("/reset-password/:token", catchAsync(resetPassword));

module.exports = router;
