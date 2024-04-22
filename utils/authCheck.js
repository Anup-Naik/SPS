module.exports.isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    req.flash("error", "You must be logged in to access this page");
    res.redirect("/login");
  }
};

module.exports.isLoggedInAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    next();
  } else {
    req.flash("error", "Access denied");
    res.redirect("/login");
  }
};

module.exports.isLoggedInFaculty = (req, res, next) => {
  if (req.session.user && req.session.user.role === "faculty") {
    next();
  } else {
    req.flash("error", "Access denied");
    res.redirect("/login");
  }
};

module.exports.isLoggedInStudent = (req, res, next) => {
  if (req.session.user && req.session.user.role === "student") {
    next();
  } else {
    req.flash("error", "Access denied");
    res.redirect("/login");
  }
};
