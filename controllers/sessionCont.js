const Admin = require("../models/adminModel");
const Faculty = require("../models/facultyModel");
const Student = require("../models/studentModel");
module.exports.renderLoginForm = (req, res) => {
  res.render("login");
};

module.exports.loggingUserIn = async (req, res) => {
  const { role, username, password } = req.body;
  let user;

  switch (role) {
    case "admin":
      user = await Admin.findOne({ username, password });
      break;
    case "faculty":
      user = await Faculty.findOne({ username, password });
      break;
    case "student":
      user = await Student.findOne({ username, password });
      break;
    default:
      break;
  }

  if (user) {
    req.session.user = {
      _id: user._id,
      username: user.username,
      role: user.role, // Store role in session
    };

    switch (user.role) {
      case "admin":
        req.flash("success", "Welcome!");
        res.redirect("/admin");
        break;
      case "faculty":
        req.flash("success", "Welcome!");
        res.redirect("/faculty");
        break;
      case "student":
        req.flash("success", "Welcome!");
        res.redirect("/student");
        break;
      default:
        res.redirect("/login");
        break;
    }
  } else {
    req.flash("error", "Invalid username or password");
    res.redirect("/login");
  }
};

module.exports.loggingUserOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};
