module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('holyHella');
    return next();
  }
  res.redirect("/login");
};

module.exports.isLoggedInAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    console.log('holyHella2');
    return next();
  }
  res.redirect("/login");
};

module.exports.isLoggedInFaculty = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "faculty") {
    return next();
  }
  res.redirect("/login");
};

module.exports.isLoggedInStudent = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "student") {
    return next();
  }
  res.redirect("/login");
};
