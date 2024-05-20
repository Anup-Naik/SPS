const express = require("express");
const router = express.Router();
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
  storeGraduateData,
  renderGraduateForm,
  toggleStudentAccess,
} = require("../controllers/adminCont");
const catchAsync = require("../utils/catchAsync");

//Admin Dashboard
router.get("/", catchAsync(adminDashboard));

//Admin-Faculty Routes
router.get("/faculty", catchAsync(showCreateFacultyForm));

router.post("/faculty", catchAsync(createFaculty));

router.get("/faculty/:id/edit", catchAsync(showEditFacultyForm));

router.put("/faculty/:id", catchAsync(updateFaculty));

router.delete("/faculty/:id", catchAsync(deleteFaculty));

//Admin-Student Routes
router.get("/studAccess", catchAsync(toggleStudentAccess));

router.get("/allStudents", catchAsync(allStudentUsers));

router.get("/student", catchAsync(showCreateStudentForm));

router.post("/student", catchAsync(createStudent));

router.get("/student/:id/edit", catchAsync(showEditStudentForm));

router.put("/student/:id", catchAsync(updateStudentByAdmin));

router.delete("/student/:id", catchAsync(deleteStudent));

//Graduate Module for admin
router.get("/graduateForm", catchAsync(renderGraduateForm));

router.post("/graduateStudents", catchAsync(storeGraduateData));

module.exports = router;
