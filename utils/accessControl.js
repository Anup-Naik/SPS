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
