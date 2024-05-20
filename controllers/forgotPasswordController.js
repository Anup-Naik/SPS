// controllers/forgotPasswordController.js
const crypto = require("crypto");
const Faculty = require("../models/facultyModel"); // Adjust path based on your project structure
const Student = require("../models/studentModel"); // Adjust path based on your project structure
const transporter = require("../utils/nodemailerConfig");

module.exports.renderForgotPasswordForm = (req, res) => {
  res.render("forgotPassword");
};

module.exports.sendResetEmail = async (req, res) => {
    const { email, userType } = req.body;
    let user;
    if (userType === "faculty") {
      user = await Faculty.findOne({ email });
    } else if (userType === "student") {
      user = await Student.findOne({ email });
    }

    if (!user) {
      req.flash("error", "No account with that email address exists.");
      return res.redirect("/forgot-password");
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetURL = `https://${req.headers.host}/reset-password/${token}`;
    const mailOptions = {
      to: user.email,
      from: process.env.GMAIL_USER,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             ${resetURL}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error("There was an error: ", err);
        req.flash("error", "There was an error sending the email.");
        return res.redirect("/forgot-password");
      } else {
        req.flash("success", `An e-mail has been sent to ${user.email} with further instructions.`);
        return res.redirect("/forgot-password");
      }
    });
};

module.exports.renderResetPasswordForm = async (req, res) => {
    let user = await Faculty.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      user = await Student.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      });
    }

    if (!user) {
      req.flash("error", "Password reset token is invalid or has expired.");
      return res.redirect("/forgot-password");
    }
    res.render("resetPassword", { token: req.params.token });
};

module.exports.resetPassword = async (req, res) => {

    let user = await Faculty.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      user = await Student.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      });
    }

    if (!user) {
      req.flash("error", "Password reset token is invalid or has expired.");
      return res.redirect("back");
    }

    if (req.body.password === req.body.confirm) {
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      req.flash("success", "Your password has been updated.");
      return res.redirect("/login");
    } else {
      req.flash("error", "Passwords do not match.");
      return res.redirect(`/reset-password/${req.params.token}`);
    }

};
