const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: String,
  mentees: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      remarks: String,
    },
  ],
});

module.exports = mongoose.model("Faculty", facultySchema);
