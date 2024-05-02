module.exports.adminDashboard = async (req, res, next) => {
  res.render("./admin");
};

//Faculty Controllers For Admin
const Faculty = require("../models/facultyModel");

// Display form to create a new faculty member
module.exports.showCreateFacultyForm = async (req, res, next) => {
  const facultyMembers = await Faculty.find();
  res.render("admin/faculty", { facultyMembers });
};

// Create a new faculty member
module.exports.createFaculty = async (req, res, next) => {
  var { username, password, name, contact, email } = req.body;
  username = username.trim();
  const faculty = new Faculty({ username, password, name, contact, email });
  await faculty.save();
  req.flash("success", "Faculty member created successfully!");
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
  var { username, password, name, contact, email } = req.body;
  username = username.trim();
  await Faculty.findByIdAndUpdate(id, {
    username,
    password,
    name,
    contact,
    email,
  });
  req.flash("success", "Faculty member updated successfully!");
  res.redirect("/admin");
};

// Delete a faculty member
module.exports.deleteFaculty = async (req, res, next) => {
  const { id } = req.params;
  await Faculty.findByIdAndDelete(id);
  req.flash("success", "Faculty member deleted successfully!");
  res.redirect("/admin");
};

// STUDENT CONTROLLERS FOR ADMIN
const Student = require("../models/studentModel");

//Display Students
module.exports.allStudentUsers = async (req, res, next) => {
  const students = await Student.find().sort({ username: 1 });
  res.render("admin/allStudents", { students });
};

// Display form to create a new student with minimal info
module.exports.showCreateStudentForm = async (req, res, next) => {
  const facultyMembers = await Faculty.find();
  res.render("admin/students", { facultyMembers });
};

// Create a new student with minimal info
module.exports.createStudent = async (req, res, next) => {
  var { username, password, sem, facultyAdvisor } = req.body;
  username = username.trim();
  const existingStudent = await Student.findOne({
    username: username,
  });
  if (existingStudent) {
    req.flash("error", "User already exists");
    return res.redirect("/admin/student");
  }
  const student = new Student({ username, password, sem, facultyAdvisor });
  await student.save();
  const faculty = await Faculty.findById(facultyAdvisor);
  faculty.mentees.push({ mentee: student._id });
  await faculty.save();
  req.flash("success", "Student created successfully!");
  res.redirect("/admin/student");
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
  var { username, password, sem, facultyAdvisor } = req.body;
  username = username.trim();
  //THE FOLLOWING LOGIC IS INCORRECT
  /* const existingStudent = await Student.findOne({
    username: username,
  });
  if (existingStudent) {
    req.flash("error", "User already exists");
    return res.redirect("/admin/allStudents");
  } */
  const student = await Student.findById(id);

  if (student.facultyAdvisor.toString() !== facultyAdvisor.toString()) {
    await Faculty.findByIdAndUpdate(student.facultyAdvisor, {
      $pull: { mentees: { mentee: id } },
    });
    await Student.findByIdAndUpdate(id, {
      username,
      password,
      sem,
      facultyAdvisor,
    });
    const faculty = await Faculty.findById(facultyAdvisor);
    faculty.mentees.push({ mentee: id });
    await faculty.save();
  } else {
    await Student.findByIdAndUpdate(id, {
      username,
      password,
      sem,
    });
  }

  req.flash("success", "Student updated successfully!");
  res.redirect("/admin/allStudents");
};

// Delete a student
module.exports.deleteStudent = async (req, res, next) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  await Faculty.updateMany(
    { "mentees.mentee": id },
    { $pull: { mentees: { mentee: id } } }
  );
  req.flash("success", "Student deleted successfully!");
  res.redirect("/admin/allStudents");
};
