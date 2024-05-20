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
router.get("/", catchAsync(facultyDashboard));

router.get("/mentees/home", catchAsync(showMentees));

router.get("/mentees", catchAsync(getFacultyMentees));

router.post("/mentees/:studentId/remarks", catchAsync(saveRemarks));

router.get("/mentees/:studentId/profile", catchAsync(viewStudentProfile));

router.get("/mentees/:studentId/progress", catchAsync(viewStudentAcademic));

router.get("/mentees/:studentId/report", catchAsync(generateStudentReport));

router.get("/mentees/:studentId/studentFiles", catchAsync(getStudentFiles));

router.post("/mentees/:studentId/meeting", catchAsync(addMeeting));

// Route to display the details of a specific graduate
router.get("/graduates/:id", catchAsync(showGraduate));

// Route to display the list of graduates for the current faculty advisor
router.get("/graduates", catchAsync(displayGraduatesList));

// Faculty memo routes
router.get("/memos", catchAsync(renderMemo));

router.post("/memos", catchAsync(addMemo));

router.delete("/memos/:memoId", catchAsync(deleteMemo));

//mails
router.get("/send-email", catchAsync(renderEmailForm));

router.post("/send-email", catchAsync(sendEmailToMentees));

module.exports = router;
