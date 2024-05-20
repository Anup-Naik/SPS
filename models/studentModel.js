const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  username: { type: String, unique: [true, "User already exists"] },
  password: String,
  role: { type: String, enum: ["student"], default: "student" },
  facultyAdvisor: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
  fullname: String,
  usn: String,
  yearOfAdmission: Number,
  yearOfGraduation: Number,
  modeOfAdmission: String,
  cetRank: Number,
  contactNum: Number,
  dob: Date,
  email: String,
  aadhar: Number,
  bloodGroup: String,
  facultyAdvisorName: String,
  sem: Number,
  parentOrGuardianName: String,
  parentOrGuardianRelation: String,
  parentOrGuardianOccupation: String,
  parentOrGuardianQualification: String,
  parentOrGuardianContactNum: Number,
  parentOrGuardianContactNum1: Number,
  parentOrGuardianEmail: String,
  address: String,
  classX: {
    yearOfPassing: Number,
    board: String,
    institute: String,
    score: String,
  },
  classXII: {
    yearOfPassing: Number,
    board: String,
    institute: String,
    score: String,
  },
  creditInfo: [
    {
      sem: Number,
      creditsRegistered: Number,
      creditsEarned: Number,
      sgpa: Number,
    },
  ],
  supplementary: [
    {
      creditsRegistered: Number,
      creditsEarned: Number,
      sgpa: Number,
    },
  ],
  backlogsInfo: [
    {
      subjectCode: String,
      subjectTitle: String,
      credits: Number,
      cleared: Boolean,
      semCleared: String,
    },
  ],

  currentSemInfo: [
    { subjectCode: String, subjectTitle: String, subjectCredits: Number },
  ],
  currentCGPA: Number,
  activityPts: { communityPts: Number, alliedPts: Number, totalPts: Number },
  regFiles: [{ filename: String, path: String }],
  suppFiles: [{ filename: String, path: String }],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.model("Student", studentSchema);
