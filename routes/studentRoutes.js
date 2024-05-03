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

// Student Module Routes
// Student Dashboard

router.get("/register", catchAsync(registerForm));

router.post("/register", catchAsync(registerStudent));

router.get(
  "/",
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(studentDashboard)
);

router.get(
  "/:id/new",
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(councelForm)
);

router.post(
  "/:id",
  isLoggedIn,
  isLoggedInStudent,
  myMulter,
  catchAsync(saveCouncelForm)
);

router.get("/:id", isLoggedIn, isLoggedInStudent, catchAsync(showStudent));

router.get(
  "/:id/edit",
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(renderEditStudent)
);

router.get(
  "/:id/advisor",
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(getFacultyAdvisor)
);

router.get(
  "/:id/password",
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(getChangePasswordForm)
);

router.post(
  "/:id/password",
  isLoggedIn,
  isLoggedInStudent,
  catchAsync(changeStudentPassword)
);

router.put(
  "/:id",
  isLoggedIn,
  isLoggedInStudent,
  myMulter,
  catchAsync(updateStudent)
);

module.exports = router;
