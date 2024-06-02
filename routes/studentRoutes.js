const express = require("express");
const router = express.Router();
const { myMulter } = require("../utils/multerUtil");
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
  registerStudent,
  registerForm,
} = require("../controllers/studentCont");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isLoggedInStudent } = require("../utils/authCheck");
const { studentRateLimiter } = require("../utils/rateLimiter");
const { allowStudentEditAccess } = require("../utils/accessControl");
// Student Module Routes

router.get("/register", studentRateLimiter, catchAsync(registerForm));

router.post("/register", studentRateLimiter, catchAsync(registerStudent));

router.get(
  "/",
  isLoggedIn,
  isLoggedInStudent,
  studentRateLimiter,
  catchAsync(studentDashboard)
);

router.get(
  "/:id/new",
  isLoggedIn,
  isLoggedInStudent,
  allowStudentEditAccess,
  studentRateLimiter,
  catchAsync(councelForm)
);

router.post(
  "/:id",
  isLoggedIn,
  isLoggedInStudent,
  allowStudentEditAccess,
  studentRateLimiter,
  myMulter,
  catchAsync(saveCouncelForm)
);

router.get(
  "/:id",
  isLoggedIn,
  isLoggedInStudent,
  studentRateLimiter,
  catchAsync(showStudent)
);

router.get(
  "/:id/edit",
  isLoggedIn,
  isLoggedInStudent,
  allowStudentEditAccess,
  studentRateLimiter,
  catchAsync(renderEditStudent)
);

router.get(
  "/:id/advisor",
  isLoggedIn,
  isLoggedInStudent,
  studentRateLimiter,
  catchAsync(getFacultyAdvisor)
);

router.get(
  "/:id/password",
  isLoggedIn,
  isLoggedInStudent,
  studentRateLimiter,
  catchAsync(getChangePasswordForm)
);

router.post(
  "/:id/password",
  isLoggedIn,
  isLoggedInStudent,
  studentRateLimiter,
  catchAsync(changeStudentPassword)
);

router.put(
  "/:id",
  isLoggedIn,
  isLoggedInStudent,
  allowStudentEditAccess,
  studentRateLimiter,
  myMulter,
  catchAsync(updateStudent)
);

module.exports = router;
