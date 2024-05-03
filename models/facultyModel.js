const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  username: { type: String, unique: [true, "User already exists"] },
  password: String,
  role: { type: String, enum: ["faculty"], default: "faculty" },
  name: String,
  contact: Number,
  email: String,
  memos: [
    {
      title: String,
      description: String,
      date: { type: Date, default: Date.now },
    },
  ],
  mentees: [
    {
      mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
      remarks: String,
      meetings: [
        {
          date: Date,
          outcome: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Faculty", facultySchema);
