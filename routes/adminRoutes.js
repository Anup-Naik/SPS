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
} = require("../controllers/adminCont");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isLoggedInAdmin } = require("../utils/authCheck");

//Admin Dashboard
router.get("/", isLoggedIn, isLoggedInAdmin, catchAsync(adminDashboard));

//Admin-Faculty Routes
router.get(
    "/faculty",
    isLoggedIn,
    isLoggedInAdmin,
    catchAsync(showCreateFacultyForm)
);

router.post(
    "/faculty",
    isLoggedIn,
    isLoggedInAdmin,
    catchAsync(createFaculty)
);

router.get(
    "/faculty/:id/edit",
    isLoggedIn,
    isLoggedInAdmin,
    catchAsync(showEditFacultyForm)
);

router.put(
    "/faculty/:id",
    isLoggedIn,
    isLoggedInAdmin,
    catchAsync(updateFaculty)
);

router.delete(
    "/faculty/:id",
    isLoggedIn,
    isLoggedInAdmin,
    catchAsync(deleteFaculty)
);

//Admin-Student Routes
router.get(
    "/allStudents",
    isLoggedIn,
    isLoggedInAdmin,
    catchAsync(allStudentUsers)
);

router.get(
    "/student",
    isLoggedIn,
    isLoggedInAdmin,
    catchAsync(showCreateStudentForm)
);

router.post(
    "/student",
    isLoggedIn,
    isLoggedInAdmin,
    catchAsync(createStudent)
);

router.get(
    "/student/:id/edit",
    isLoggedIn,
    isLoggedInAdmin,
    catchAsync(showEditStudentForm)
);

router.put(
    "/student/:id",
    isLoggedIn,
    isLoggedInAdmin,
    catchAsync(updateStudentByAdmin)
);

router.delete(
    "/student/:id",
    isLoggedIn,
    isLoggedInAdmin,
    catchAsync(deleteStudent)
);

//Graduate Module for admin
router.get(
    "/graduateForm",
    isLoggedIn,
    isLoggedInAdmin,
    catchAsync(renderGraduateForm)
);

router.post(
    "/graduateStudents",
    isLoggedIn,
    isLoggedInAdmin,
    catchAsync(storeGraduateData)
);

module.exports = router;