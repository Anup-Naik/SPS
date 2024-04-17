const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: String,
  mentees: [{ studentId: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

module.exports = mongoose.model("Faculty", facultySchema);
