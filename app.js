const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const MongoStore = require("connect-mongo");
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
  allStudentUsers,
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
  studentDashboard,
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
const {
  loggingUserIn,
  loggingUserOut,
  renderLoginForm,
} = require("./controllers/sessionCont");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

main()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/SPS");
}

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/SPS" }),
    cookie: {
      maxAge: 3600000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "Strict",
    },
    rolling: true,
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP temporarily for debugging
    frameguard: {
      action: "sameorigin",
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
    },
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
});

app.use(limiter); // Apply the rate limiting middleware globally
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(methodOverride("_method"));
app.use((req, res, next) => {
  res.locals.successMessages = req.flash("success");
  res.locals.errorMessages = req.flash("error");
  res.locals.currentUser = req.session.user;
  next();
});

/* const UPLOADS_DIR = path.join(__dirname, "..", "uploads"); */

//Login Routes
app.get("/login", renderLoginForm);

app.post("/login", catchAsync(loggingUserIn));

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
  "/admin/allStudents",
  isLoggedIn,
  isLoggedInAdmin,
  catchAsync(allStudentUsers)
);

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

//Home Page
app.get("/", (req, res) => {
  res.render("home");
});

// Student Module Routes
// Student Dashboard
app.get(
  "/student",
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(studentDashboard)
);

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

app.get("/logout", isLoggedIn, loggingUserOut);

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
