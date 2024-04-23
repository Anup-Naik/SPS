const mongoose = require("mongoose");

const Faculty = require("../models/facultyModel");
const Student = require("../models/studentModel");

module.exports.facultyDashboard = async (req, res, next) => {
  const faculty = await Faculty.findById(req.session.user._id);
  res.render("./faculty", { faculty });
};

module.exports.showMentees = async (req, res, next) => {
  const faculty = await Faculty.findById(req.session.user._id).populate("mentees.mentee");

  // Use a Set to store unique student IDs
  const visitedStudents = new Set();

  // Filter and sort mentees by semester
  const sortedMentees = faculty.mentees
    .filter((mentee) => {
      const student = mentee.mentee;
      return (
        student &&
        student.fullname &&
        student.usn &&
        student.sem &&
        student.contactNum &&
        student.email &&
        student.facultyAdvisorName &&
        !visitedStudents.has(student._id)
      );
    })
    .sort((a, b) => a.mentee.sem - b.mentee.sem);

  res.render("faculty/show", { faculty, sortedMentees });
};

// Controller to get faculty's mentees and their remarks
module.exports.getFacultyMentees = async (req, res, next) => {
  const faculty = await Faculty.findById(req.session.user._id).populate("mentees.mentee");
  res.render("faculty/mentees", { faculty });
};

// Controller to save remarks for a student
module.exports.saveRemarks = async (req, res, next) => {
  const { studentId } = req.params;
  const { remarks } = req.body.mentee;
  const updatedFaculty = await Faculty.findOneAndUpdate(
    {
      _id: req.session.user._id,
      "mentees.mentee": new mongoose.Types.ObjectId(studentId),
    },
    { $set: { "mentees.$[elem].remarks": remarks } },
    {
      arrayFilters: [{ "elem.mentee": new mongoose.Types.ObjectId(studentId) }],
      new: true,
    }
  );
  req.flash("success", "Remarks saved successfully!");
  res.redirect("/mentees");
};

// Controller function to view detailed student profile
module.exports.viewStudentProfile = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);
  const faculty = await Faculty.findById(req.session.user._id);
  res.render("faculty/studentProfile", { student, faculty });
};

// Controller function to add a meeting for a specific mentee
module.exports.addMeeting = async (req, res, next) => {
  const { studentId } = req.params;
  const { date, outcome } = req.body;
  const faculty = await Faculty.findOneAndUpdate(
    { "mentees.mentee": new mongoose.Types.ObjectId(studentId) },
    { $push: { "mentees.$.meetings": { date, outcome } } },
    { new: true }
  );
  req.flash("success", "Meeting added successfully!");
  res.redirect(`/mentees/${studentId}/profile`);
};

// Controller function to view academic progress of a student
module.exports.viewStudentAcademic = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);
  res.render("faculty/studentAcademic", { student });
};

// Controller function to generate a report for a student
module.exports.generateStudentReport = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);
  /* window.print */
  res.render("faculty/studentReport", { student });
};

// Controller to get files for a specific student by student ID
module.exports.getStudentFiles = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);
  const { regFiles, suppFiles } = student;
  res.render("faculty/studentFiles", { regFiles, suppFiles, req });
};
