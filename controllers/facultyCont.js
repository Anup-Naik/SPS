const mongoose = require("mongoose");

const Faculty = require("../models/facultyModel");
const Student = require("../models/studentModel");

module.exports.facultyDashboard = async (req, res, next) => {
  const faculty = await Faculty.findById(req.session.user._id);
  res.render("./faculty", { faculty });
};

module.exports.showMentees = async (req, res, next) => {
  const faculty = await Faculty.findById(req.session.user._id).populate(
    "mentees.mentee"
  );

  if (faculty && faculty.mentees && faculty.mentees.length > 0) {
    // Sort the populated mentees based on username(USN)
    faculty.mentees.sort((a, b) => {
      const usernameA = a.mentee.username.toLowerCase();
      const usernameB = b.mentee.username.toLowerCase();
      if (usernameA < usernameB) return -1;
      if (usernameA > usernameB) return 1;
      return 0;
    });
  }

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
  const faculty = await Faculty.findById(req.session.user._id).populate(
    "mentees.mentee"
  );
  if (faculty && faculty.mentees && faculty.mentees.length > 0) {
    // Sort the populated mentees based on username
    faculty.mentees.sort((a, b) => {
      const usernameA = a.mentee.username.toLowerCase();
      const usernameB = b.mentee.username.toLowerCase();
      if (usernameA < usernameB) return -1;
      if (usernameA > usernameB) return 1;
      return 0;
    });
  }
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
  res.redirect("/faculty/mentees");
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
  res.redirect(`/faculty/mentees/${studentId}/profile`);
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
  res.render("faculty/studentFiles", { regFiles, suppFiles, req, student });
};

// Graduates
const Graduate = require("../models/graduatesModel");
const catchAsync = require("../utils/catchAsync");

module.exports.displayGraduatesList = async (req, res) => {
  const facultyId = req.session.user._id;
  const graduates = await Graduate.find({ facultyAdvisor: facultyId });
  res.render("faculty/graduatesList", { graduates });
};

module.exports.showGraduate = async (req, res) => {
  const graduateId = req.params.id;
  const graduate = await Graduate.findById(graduateId);
  res.render("faculty/graduateDetails", { graduate });
};

// Memos

module.exports.renderMemo = async (req, res) => {
  const faculty = await Faculty.findById(req.session.user._id);
  res.render("faculty/memos", { memos: faculty.memos });
};

module.exports.addMemo = async (req, res) => {
  const { title, description } = req.body;
  const facultyId = req.session.user._id;
  const faculty = await Faculty.findById(facultyId);
  faculty.memos.push({ title, description });
  await faculty.save();
  req.flash("success", "Memo added successfully");
  res.redirect("/faculty/memos");
};

module.exports.deleteMemo = async (req, res) => {
  const facultyId = req.session.user._id;
  const { memoId } = req.params;
  await Faculty.findByIdAndUpdate(
    facultyId,
    { $pull: { memos: { _id: memoId } } },
    { new: true }
  );
  req.flash("success", "Memo deleted successfully");
  res.redirect("/faculty/memos");
};

//Mails

module.exports.renderEmailForm = (req, res) => {
  res.render("faculty/sendEmail");
};

const transporter = require("../utils/nodemailerConfig");

module.exports.sendEmailToMentees = async (req, res) => {
  const facultyId = req.session.user._id;
  const { subject, message, semester } = req.body;

  // Find the faculty and populate the mentees
  const faculty = await Faculty.findById(facultyId).populate("mentees.mentee");

  // Filter mentees based on semester (if specified)
  const mentees = semester
    ? faculty.mentees.filter((mentee) => mentee.mentee.sem === Number(semester))
    : faculty.mentees;

  let failedEmails = [];
  let successfulEmails = [];

  // Send email to each mentee
  for (const mentee of mentees) {
    const student = mentee.mentee;
    if (student.email) {
      const mailOptions = {
        to: student.email,
        from: process.env.GMAIL_USER,
        subject,
        text: `${message}\n\nFrom,\n${faculty.username}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        successfulEmails.push(`${student.fullname} (${student.usn})`);
      } catch (err) {
        console.error("Error sending email to", student.email, err);
        failedEmails.push(`${student.fullname} (${student.usn})`);
      }
    }
  }

  if (failedEmails.length > 0) {
    req.flash("error", `Failed to send emails to: ${failedEmails.join(", ")}`);
  }

  if (successfulEmails.length > 0) {
    req.flash(
      "success",
      `Emails sent successfully to ${successfulEmails.length} students`
    );
  }

  res.redirect("/faculty/mentees/home");
};
