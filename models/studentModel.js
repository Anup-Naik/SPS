const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullname: String,
  usn: String,
  yearOfAdmission: String,
  modeOfAdmission: String,
  cetRank: Number,
  contactNum: String,
  dob: Date,
  email: String,
  aadhar: String,
  bloodGroup: String,
  facultyAdvisorName: String,
  sem: String,
  parentOrGuardianName: String,
  parentOrGuardianRelation: String,
  parentOrGuardianOccupation: String,
  parentOrGuardianQualification: String,
  parentOrGuardianContactNum: String,
  parentOrGuardianContactNum1: String,
  parentOrGuardianEmail: String,
  address: String,
  classX: {
    yearOfPassing: String,
    board: String,
    institute: String,
    score: String,
  },
  classXII: {
    yearOfPassing: String,
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
  files: [{ name: String, url: String }],
});

module.exports = mongoose.model("Student", studentSchema);
