module.exports.adminDashboard = async (req, res, next) => {
  res.render("./admin");
};

const Faculty = require("../models/facultyModel");

// Display form to create a new faculty member
module.exports.showCreateFacultyForm = async (req, res, next) => {
  const facultyMembers = await Faculty.find();
  res.render("admin/faculty", { facultyMembers });
};

// Create a new faculty member
module.exports.createFaculty = async (req, res, next) => {
  const { username, password, name, contact, email } = req.body;
  const faculty = new Faculty({ username, password, name, contact, email });
  await faculty.save();
  /*  req.flash("success", "Faculty member created successfully!"); */
  res.redirect("/admin");
};

// Display form to edit a faculty member
module.exports.showEditFacultyForm = async (req, res, next) => {
  const { id } = req.params;
  const faculty = await Faculty.findById(id);
  res.render("admin/editFaculty", { faculty });
};

// Update a faculty member
module.exports.updateFaculty = async (req, res, next) => {
  const { id } = req.params;
  const { username, password, name, contact, email } = req.body;
  await Faculty.findByIdAndUpdate(id, {
    username,
    password,
    name,
    contact,
    email,
  });
  /* req.flash("success", "Faculty member updated successfully!"); */
  res.redirect("/admin");
};

// Delete a faculty member
module.exports.deleteFaculty = async (req, res, next) => {
  const { id } = req.params;
  await Faculty.findByIdAndDelete(id);
  /* req.flash("success", "Faculty member deleted successfully!"); */
  res.redirect("/admin");
};

// STUDENT CONTROLLERS FOR ADMIN
const Student = require("../models/studentModel");

// Display form to create a new student with minimal info
module.exports.showCreateStudentForm = async (req, res, next) => {
  const facultyMembers = await Faculty.find();
  const students = await Student.find();
  res.render("admin/students", { facultyMembers, students });
};

// Create a new student with minimal info
module.exports.createStudent = async (req, res, next) => {
  const { username, password, facultyAdvisor } = req.body;
  const student = new Student({ username, password, facultyAdvisor });
  await student.save();
  /* req.flash("success", "Student created successfully!"); */
  res.redirect("/admin");
};

// Display form to edit a student
module.exports.showEditStudentForm = async (req, res, next) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  const facultyMembers = await Faculty.find();
  res.render("admin/editStudent", { student, facultyMembers });
};

// Update student information
module.exports.updateStudentByAdmin = async (req, res, next) => {
  const { id } = req.params;
  const { username, password, facultyAdvisor } = req.body;
  await Student.findByIdAndUpdate(id, { username, password, facultyAdvisor });
  /* req.flash("success", "Student updated successfully!"); */
  res.redirect("/admin");
};

// Delete a student
module.exports.deleteStudent = async (req, res, next) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  /* req.flash("success", "Student deleted successfully!"); */
  res.redirect("/admin");
};
