const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullname: String,
  usn: String,
  yearOfAdmission: String,
  modeOfAdmission: String,
  cetRank: Number,
  contactNum: String,
  dob: String,
  email: String,
  aadhar: String,
  bloodGroup: String,
  facultyAdvisorName: String,
  sem: String,
  fatherName: String,
  fatherOccupation: String,
  fatherQualification: String,
  fatherContactNum: String,
  fatherEmail: String,
  motherName: String,
  motherOccupation: String,
  motherQualification: String,
  motherContactNum: String,
  motherEmail: String,
  address: String,
  classX: {
    yearOfPassing: Number,
    Board: String,
    Institute: String,
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
      file: { name: String, url: String },
    },
  ],
  supplementary: [
    {
      creditsRegistered: Number,
      creditsEarned: Number,
      sgpa: Number,
      file: { name: String, url: String },
    },
  ],
  backlogs: [
    {
      subjectCode: String,
      subjectTitle: String,
      credits: Number,
      cleared: Boolean,
      file: { name: String, url: String },
    },
  ],

  currentSemRegSub: [
    { subjectCode: String, subjectTitle: String, credits: Number },
  ],
  currentCGPA: Number,
  activityPts: { community: Number, allied: Number, total: Number },
  remarks: String,
});

module.exports = mongoose.model("Student", studentSchema);
