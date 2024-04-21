const mongoose = require("mongoose");

const Faculty = require("../models/facultyModel");
const Student = require("../models/studentModel");

const facultyId = "66251f9ae3a1bc3ea0285515";

module.exports.facultyDashboard = async (req, res, next) => {
  const faculty = await Faculty.findById(facultyId);
  res.render("./faculty",{faculty});
};

module.exports.showMentees = async (req, res, next) => {
  const faculty = await Faculty.findById(facultyId).populate("mentees.mentee");

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
  const faculty = await Faculty.findById(facultyId).populate("mentees.mentee");
  res.render("faculty/mentees", { faculty });
};

// Controller to save remarks for a student
module.exports.saveRemarks = async (req, res, next) => {
  const { studentId } = req.params;
  const { remarks } = req.body.mentee; // Access the remarks field using req.body.mentee.remarks
  const facultyId = "662495ae2695faf2fdc1fd70";
  console.log(req.body);
  const updatedFaculty = await Faculty.findOneAndUpdate(
    {
      _id: facultyId,
      "mentees.mentee": new mongoose.Types.ObjectId(studentId),
    },
    { $set: { "mentees.$[elem].remarks": remarks } },
    {
      arrayFilters: [{ "elem.mentee": new mongoose.Types.ObjectId(studentId) }],
      new: true,
    }
  );

  res.redirect("/mentees");
};

// Controller function to view detailed student profile
module.exports.viewStudentProfile = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);
  const faculty = await Faculty.findById(facultyId);
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
  console.log(regFiles, suppFiles);
  res.render("faculty/studentFiles", { regFiles, suppFiles, req });
};
