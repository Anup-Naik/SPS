const express = require("express");
const router = express.Router();
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
  showGraduate,
  displayGraduatesList,
  renderMemo,
  addMemo,
  deleteMemo,
  renderEmailForm,
  sendEmailToMentees,
} = require("../controllers/facultyCont");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isLoggedInFaculty } = require("../utils/authCheck");

//Faculty Module Routes
router.get("/", isLoggedIn, isLoggedInFaculty, catchAsync(facultyDashboard));

router.get(
  "/mentees/home",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(showMentees)
);

router.get(
  "/mentees",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(getFacultyMentees)
);

router.post(
  "/mentees/:studentId/remarks",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(saveRemarks)
);

router.get(
  "/mentees/:studentId/profile",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(viewStudentProfile)
);

router.get(
  "/mentees/:studentId/progress",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(viewStudentAcademic)
);

router.get(
  "/mentees/:studentId/report",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(generateStudentReport)
);

router.get(
  "/mentees/:studentId/studentFiles",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(getStudentFiles)
);

router.post(
  "/mentees/:studentId/meeting",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(addMeeting)
);

// Route to display the details of a specific graduate
router.get(
  "/graduates/:id",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(showGraduate)
);

// Route to display the list of graduates for the current faculty advisor
router.get(
  "/graduates",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(displayGraduatesList)
);

// Faculty memo routes
router.get("/memos", isLoggedIn, isLoggedInFaculty, catchAsync(renderMemo));

router.post("/memos", isLoggedIn, isLoggedInFaculty, catchAsync(addMemo));

router.delete(
  "/memos/:memoId",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(deleteMemo)
);

//mails
router.get(
  "/send-email",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(renderEmailForm)
);

router.post(
  "/send-email",
  isLoggedIn,
  isLoggedInFaculty,
  catchAsync(sendEmailToMentees)
);

module.exports = router;
