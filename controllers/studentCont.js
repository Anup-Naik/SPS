const Student = require("../models/studentModel");
const Faculty = require("../models/facultyModel");

module.exports.registerForm = async (req, res) => {
  const facultyMembers = await Faculty.find();
  res.render("./students/registerStudent", { facultyMembers });
};

module.exports.registerStudent = async (req, res, next) => {
  var { username, facultyAdvisor } = req.body;
  username = username.trim();
  const existingStudent = await Student.findOne({
    username: username,
  });
  if (!existingStudent) {
    const student = new Student(req.body);
    await student.save();
    const faculty = await Faculty.findById(facultyAdvisor);
    faculty.mentees.push({ mentee: student._id });
    await faculty.save();
    req.flash("success", "Registered Successfully");
    return res.redirect("/login");
  }
  req.flash("error", "User already exists");
  res.redirect("/login");
};

module.exports.studentDashboard = async (req, res) => {
  const id = req.session.user._id;
  const student = await Student.findById({ _id: id });
  res.render("./students", { student });
};

module.exports.councelForm = async (req, res, next) => {
  const id = req.session.user._id;
  const student = await Student.findById({ _id: id });
  res.render("./students/counsellingForm", { student });
};

module.exports.saveCouncelForm = async (req, res, next) => {
  const id = req.session.user._id;
  const student = await Student.findByIdAndUpdate(id, req.body);
  if (req.files.regSemFiles) student.regFiles = req.files.regSemFiles;
  if (req.files.suppSemFiles) student.suppFiles = req.files.suppSemFiles;
  await student.save();
  req.flash("success", "Counseling form saved successfully!");
  res.redirect("/student");
};

module.exports.showStudent = async (req, res, next) => {
  const id = req.session.user._id;
  const student = await Student.findById({ _id: id });
  res.render("./students/show", { student });
};

module.exports.renderEditStudent = async (req, res, next) => {
  const id = req.session.user._id;
  const student = await Student.findById({ _id: id });
  res.render("./students/edit", { student });
};

module.exports.updateStudent = async (req, res, next) => {
  const id = req.session.user._id;
  const student = await Student.findByIdAndUpdate(id, req.body);
  if (req.files.regSemFiles) {
    req.files.regSemFiles.forEach((element) => {
      student.regFiles.push(element);
    });
  }
  if (req.files.suppSemFiles) {
    req.files.suppSemFiles.forEach((element) => {
      student.suppFiles.push(element);
    });
  }
  await student.save();
  req.flash("success", "Student information updated successfully!");
  res.redirect("/student");
};

module.exports.getFacultyAdvisor = async (req, res, next) => {
  const id = req.session.user._id;
  const student = await Student.findById(id).populate(
    "facultyAdvisor",
    "name contact email"
  );
  res.render("students/facultyAdvisor", { student });
};

module.exports.getChangePasswordForm = async (req, res, next) => {
  const id = req.session.user._id;
  const student = await Student.findById(id);
  res.render("students/changePassword", { student });
};

module.exports.changeStudentPassword = async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const id = req.session.user._id;
  const student = await Student.findById(id);

  if (currentPassword !== student.password) {
    req.flash("error", "Current password is incorrect!");
    return res.redirect(`/student/${id}/password`);
  }

  if (newPassword !== confirmPassword) {
    req.flash("error", "New password and confirm password do not match!");
    return res.redirect(`/student/${id}/password`);
  }

  student.password = newPassword;
  await student.save();
  req.flash("success", "Password changed successfully!");
  res.redirect("/student");
};
