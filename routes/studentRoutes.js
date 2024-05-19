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
const { allowStudentAccess } = require("../utils/accessControl");

// Student Module Routes
// Student Dashboard

router.get("/register", allowStudentAccess, catchAsync(registerForm));

router.post("/register", allowStudentAccess, catchAsync(registerStudent));

router.get(
  "/",
  allowStudentAccess,
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(studentDashboard)
);

router.get(
  "/:id/new",
  allowStudentAccess,
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(councelForm)
);

router.post(
  "/:id",
  allowStudentAccess,
  isLoggedIn,
  isLoggedInStudent,
  myMulter,
  catchAsync(saveCouncelForm)
);

router.get(
  "/:id",
  allowStudentAccess,
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(showStudent)
);

router.get(
  "/:id/edit",
  allowStudentAccess,
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(renderEditStudent)
);

router.get(
  "/:id/advisor",
  allowStudentAccess,
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(getFacultyAdvisor)
);

router.get(
  "/:id/password",
  allowStudentAccess,
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(getChangePasswordForm)
);

router.post(
  "/:id/password",
  allowStudentAccess,
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(changeStudentPassword)
);

router.put(
  "/:id",
  allowStudentAccess,
  isLoggedIn,
  isLoggedInStudent,
  myMulter,
  catchAsync(updateStudent)
);

module.exports = router;
