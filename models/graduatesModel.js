const mongoose = require("mongoose");

const graduatesSchema = new mongoose.Schema({
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
  currentCGPA: Number,
  activityPts: { communityPts: Number, alliedPts: Number, totalPts: Number },
  regFiles: [{ filename: String, path: String }],
  suppFiles: [{ filename: String, path: String }],
});

module.exports = mongoose.model("Graduate", graduatesSchema);
