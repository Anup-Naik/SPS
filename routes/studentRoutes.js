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
  renderStudentInfoForm,
  renderParentsInfoForm,
  renderAcademicInfoForm,
  renderAcademicInfoContForm,
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
  "/show",
  isLoggedIn,
  isLoggedInStudent,
  studentRateLimiter,
  catchAsync(showStudent)
);

router.get(
  "/advisor",
  isLoggedIn,
  isLoggedInStudent,
  studentRateLimiter,
  catchAsync(getFacultyAdvisor)
);

router.get(
  "/password",
  isLoggedIn,
  isLoggedInStudent,
  studentRateLimiter,
  catchAsync(getChangePasswordForm)
);

router.post(
  "/password",
  isLoggedIn,
  isLoggedInStudent,
  studentRateLimiter,
  catchAsync(changeStudentPassword)
);

router.get(
  "/studentInfo",
  isLoggedIn,
  isLoggedInStudent,
  allowStudentEditAccess,
  studentRateLimiter,
  catchAsync(renderStudentInfoForm)
);

router.get(
  "/parentsInfo",
  isLoggedIn,
  isLoggedInStudent,
  allowStudentEditAccess,
  studentRateLimiter,
  catchAsync(renderParentsInfoForm)
);

router.get(
  "/academicInfo",
  isLoggedIn,
  isLoggedInStudent,
  allowStudentEditAccess,
  studentRateLimiter,
  catchAsync(renderAcademicInfoForm)
);

router.get(
  "/academicInfoCont",
  isLoggedIn,
  isLoggedInStudent,
  allowStudentEditAccess,
  studentRateLimiter,
  catchAsync(renderAcademicInfoContForm)
);

router.put(
  "/update",
  isLoggedIn,
  isLoggedInStudent,
  allowStudentEditAccess,
  studentRateLimiter,
  myMulter,
  catchAsync(updateStudent)
);

module.exports = router;
