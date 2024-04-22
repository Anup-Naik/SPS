const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const {
  showCreateFacultyForm,
  createFaculty,
  showEditFacultyForm,
  updateFaculty,
  deleteFaculty,
  adminDashboard,
  showCreateStudentForm,
  createStudent,
  updateStudentByAdmin,
  showEditStudentForm,
  deleteStudent,
} = require("./controllers/adminCont");
const {
  getFacultyMentees,
  saveRemarks,
  viewStudentProfile,
  viewStudentAcademic,
  generateStudentReport,
  getStudentFiles,
  addMeeting,
  showMentees,
  facultyDashboard,
} = require("./controllers/facultyCont");
const {
  councelForm,
  saveCouncelForm,
  showStudent,
  renderEditStudent,
  updateStudent,
  getFacultyAdvisor,
  getChangePasswordForm,
  changeStudentPassword,
} = require("./controllers/studentCont");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const { myMulter } = require("./utils/multerUtil");
const methodOverride = require("method-override");
const {
  isLoggedIn,
  isLoggedInAdmin,
  isLoggedInFaculty,
  isLoggedInStudent,
} = require("./utils/authCheck");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

app.use(passport.session());
app.use(flash());

require("./config/passportConfig")(passport);

const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

main()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/SPS");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Login Routes
app.get("/login", (req, res, next) => {
  res.render("login", { messages: req.flash("error") });
});

app.post(
  "/login",
  (req, res, next) => {
    const { role } = req.body;
    req.session.role = role; // Store role in session for redirection
    next();
  },
  (req, res, next) => {
    // Choose the appropriate strategy based on the role
    if (req.body.role === "admin") {
      passport.authenticate("admin", {
        failureRedirect: "/login",
        failureFlash: true,
      })(req, res, next);
    } else if (req.body.role === "faculty") {
      passport.authenticate("faculty", {
        failureRedirect: "/login",
        failureFlash: true,
      })(req, res, next);
    } else if (req.body.role === "student") {
      passport.authenticate("student", {
        failureRedirect: "/login",
        failureFlash: true,
      })(req, res, next);
    } else {
      res.redirect("/login");
    }
  },
  (req, res) => {
    const { role } = req.session.passport ? req.session.passport.user : { role: null };
    console.log("Session ID:", req.sessionID);
    console.log("Session:", req.session);
    console.log("Role:", role);
    if (role === "admin") {
      res.redirect("/admin");
    } else if (role === "faculty") {
      res.redirect("/faculty");
    } else if (role === "student") {
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  }
);

//Admin Dashboard
app.get("/admin", isLoggedIn, isLoggedInAdmin, catchAsync(adminDashboard));

//Admin-Faculty Routes
app.get(
  "/admin/faculty",
  isLoggedIn,
  isLoggedInAdmin,
  catchAsync(showCreateFacultyForm)
);

app.post(
  "/admin/faculty",
  isLoggedIn,
  isLoggedInAdmin,
  catchAsync(createFaculty)
);

app.get(
  "/admin/faculty/:id/edit",
  isLoggedIn,
  isLoggedInAdmin,
  catchAsync(showEditFacultyForm)
);

app.put(
  "/admin/faculty/:id",
  isLoggedIn,
  isLoggedInAdmin,
  catchAsync(updateFaculty)
);

app.delete(
  "/admin/faculty/:id",
  isLoggedIn,
  isLoggedInAdmin,
  catchAsync(deleteFaculty)
);

//Admin-Student Routes
app.get(
  "/admin/student",
  isLoggedIn,
  isLoggedInAdmin,
  catchAsync(showCreateStudentForm)
);

app.post(
  "/admin/student",
  isLoggedIn,
  isLoggedInAdmin,
  catchAsync(createStudent)
);

app.get(
  "/admin/student/:id/edit",
  isLoggedIn,
  isLoggedInAdmin,
  catchAsync(showEditStudentForm)
);

app.put(
  "/admin/student/:id",
  isLoggedIn,
  isLoggedInAdmin,
  catchAsync(updateStudentByAdmin)
);

app.delete(
  "/admin/student/:id",
  isLoggedIn,
  isLoggedInAdmin,
  catchAsync(deleteStudent)
);

//Faculty Module Routes
app.get(
  "/faculty",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(facultyDashboard)
);

app.get(
  "/mentees/home",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(showMentees)
);

app.get(
  "/mentees",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(getFacultyMentees)
);

app.post(
  "/mentees/:studentId/remarks",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(saveRemarks)
);

app.get(
  "/mentees/:studentId/profile",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(viewStudentProfile)
);

app.get(
  "/mentees/:studentId/progress",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(viewStudentAcademic)
);

app.get(
  "/mentees/:studentId/report",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(generateStudentReport)
);

app.get(
  "/mentees/:studentId/studentFiles",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(getStudentFiles)
);

app.post(
  "/mentees/:studentId/meeting",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(addMeeting)
);

/* DO NOT MOVE THIS, File Server */
app.get("/file/:filename", isLoggedIn, isLoggedInFaculty, (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "uploads", fileName);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error serving file");
    }
  });
});

// Student Module Routes
// Student HomePage
app.get("/", isLoggedIn, isLoggedInStudent, async (req, res) => {
  res.render("index");
});

app.get(
  "/student/:id/new",
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(councelForm)
);

app.post(
  "/student/:id",
  isLoggedIn,
  isLoggedInStudent,
  myMulter,
  catchAsync(saveCouncelForm)
);

app.get("/student/:id", isLoggedIn, isLoggedInStudent, catchAsync(showStudent));

app.get(
  "/student/:id/edit",
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(renderEditStudent)
);

app.get(
  "/student/:id/advisor",
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(getFacultyAdvisor)
);

app.get(
  "/student/:id/password",
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(getChangePasswordForm)
);

app.post(
  "/student/:id/password",
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(changeStudentPassword)
);

app.put(
  "/student/:id",
  isLoggedIn,
  isLoggedInStudent,
  myMulter,
  catchAsync(updateStudent)
);

app.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.redirect("/login");
});

// All Routes Except Above
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
