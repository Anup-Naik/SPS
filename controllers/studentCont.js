const Student = require("../models/studentModel");

module.exports.councelForm = (req, res) => {
  res.render("./students/counsellingForm");
};

module.exports.saveCouncelForm = async (req, res) => {
  const student = new Student(req.body);
  student.regFiles = req.files.regSemFiles;
  student.suppFiles = req.files.suppSemFiles;
  await student.save();
  res.redirect("/");
};

module.exports.showStudent = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById({ _id: id });
  res.render("./students/show", { student });
};

module.exports.renderEditStudent = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById({ _id: id });
  res.render("./students/edit", { student });
};

module.exports.updateStudent = async (req, res) => {
  const { id } = req.params;
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
  res.redirect("/");
};
