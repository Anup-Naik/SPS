const usn = {
  AI: /2BA\d{2}\AI\d{3}/,
  AU: /2BA\d{2}\AU\d{3}/,
  BT: /2BA\d{2}\BT\d{3}/,
  CS: /2BA\d{2}\CS\d{3}/,
  CV: /2BA\d{2}\CV\d{3}/,
  EC: /2BA\d{2}\EC\d{3}/,
  EE: /2BA\d{2}\EE\d{3}/,
  EI: /2BA\d{2}\EI\d{3}/,
  IP: /2BA\d{2}\IP\d{3}/,
  IS: /2BA\d{2}\IS\d{3}/,
  ME: /2BA\d{2}\ME\d{3}/,
};

module.exports.usnValidator = (req, res, next) => {
  var { username, department } = req.body;
  if (!username) {
    req.flash("error", "USN is required");
    return res.redirect("/student/register");
  }
  username = username.trim();
  const branchCode = username.slice(5, 7);
  const branchRegex = usn[branchCode];
  if (branchRegex && branchRegex.test(username) && branchCode === department) {
    next();
  } else {
    req.flash("error", `Only ${department} Department Students can Register`);
    if (req.session.user && req.session.user.role == "admin") {
      return res.redirect("/admin/student");
    }
    res.redirect("/student/register");
  }
};
