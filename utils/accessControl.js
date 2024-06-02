const Admin = require("../models/adminModel");

module.exports.allowStudentAccess = async (req, res, next) => {
  const admin = await Admin.findOne({ role: "admin" }, { allowStudAccess: 1 });
  if (admin && admin.allowStudAccess) {
    next();
  } else {
    req.flash("error", "Students Access Denied");
    return res.redirect("/");
  }
};

module.exports.allowStudentEditAccess = async (req, res, next) => {
  const admin = await Admin.findOne({ role: "admin" }, { allowStudEditAccess: 1 });
  if (admin && admin.allowStudEditAccess) {
    next();
  } else {
    req.flash("error", "Edit Access Denied");
    return res.redirect("/student");
  }
};