const Faculty = require("../models/facultyModel");
const Student = require("../models/studentModel");

// Controller to get faculty's mentees and their remarks
module.exports.getFacultyMentees = async (req, res, next) => {
  try {
    const facultyId = "662495ae2695faf2fdc1fd70";
    const faculty = await Faculty.findById(facultyId).populate(
      "mentees.mentee"
    );
    console.log(faculty);
    res.render("faculty/mentees", { faculty });
  } catch (err) {
    console.error(err);
    // Handle error
    res.status(500).send("Internal Server Error");
  }
};

// Controller to save remarks for a student
module.exports.saveRemarks = async (req, res, next) => {
  const { studentId } = req.params;
  const { remarks } = req.body;
  const faculty = await Faculty.findById(facultyId);
  const existingMentee = faculty.mentees.find(
    (mentee) => mentee._id.toString() === studentId
  );
  if (existingMentee) {
    existingMentee.remarks = remarks;
  }
  await faculty.save();
  res.redirect("/faculty/mentees");
};

// Controller function to view detailed student profile
module.exports.viewStudentProfile = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);
  res.render("faculty/studentProfile", { student });
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
};

// Controller function to add a meeting for a specific mentee
exports.addMeeting = async (req, res, next) => {
  const { menteeId } = req.params;
  const { date, outcome } = req.body;
  const faculty = await Faculty.findByIdAndUpdate(
    { "mentees._id": menteeId },
    {
      $push: {
        "mentees.$.meetings": {
          date,
          outcome,
        },
      },
    },
    { new: true }
  );

  res.redirect("/faculty/profile"); // Redirect to the profile page or any other relevant page
};
