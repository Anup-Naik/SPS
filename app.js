const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const mongoSanitize = require("express-mongo-sanitize");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const path = require("path");
const sessionRoutes = require("./routes/sessionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const studentRoutes = require("./routes/studentRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
const {
  globalLimiter,
  adminRateLimiter,
  facultyRateLimiter,
} = require("./utils/rateLimiter");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const {
  isLoggedIn,
  isLoggedInFaculty,
  isLoggedInAdmin,
} = require("./utils/authCheck");
const { allowStudentAccess } = require("./utils/accessControl");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    name: "spsession",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: {
      maxAge: 3600000,
      //secure: true,
      httpOnly: true,
      sameSite: "Strict",
    },
    rolling: true,
  })
);
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'"],
      scriptSrc: ["'unsafe-inline'", "'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      workerSrc: ["'self'", "blob:"],
      childSrc: ["blob:"],
      objectSrc: [],
      imgSrc: ["'self'", "blob:", "data:"],
      fontSrc: ["'self'"],
    },
  })
);

app.use(globalLimiter); // Apply the rate limiting middleware globally
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
app.use(mongoSanitize());

//Home Page
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/", sessionRoutes);
app.use("/", forgotPasswordRoutes);
app.use("/admin", isLoggedIn, isLoggedInAdmin, adminRateLimiter, adminRoutes);
app.use(
  "/faculty",
  isLoggedIn,
  isLoggedInFaculty,
  facultyRateLimiter,
  facultyRoutes
);
app.use("/student", allowStudentAccess, studentRoutes);

/* DO NOT MOVE THIS, File Route */
app.get(
  "/file/:filename",
  isLoggedIn,
  isLoggedInFaculty,
  facultyRateLimiter,
  (req, res) => {
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
  }
);

// All Routes Except Above
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something Went Wrong!";

  if (!res.headersSent) {
    res.status(statusCode).render("error", { err });
  }
});

module.exports = app;