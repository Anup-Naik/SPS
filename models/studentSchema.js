const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
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
  sem1: {
    creditsRegistered: Number,
    creditsEarned: Number,
    sgpa: Number,
    file: { name: String, url: String },
  },
  sem2: {
    creditsRegistered: Number,
    creditsEarned: Number,
    sgpa: Number,
    file: { name: String, url: String },
  },
  sem3: {
    creditsRegistered: Number,
    creditsEarned: Number,
    sgpa: Number,
    file: { name: String, url: String },
  },
  sem4: {
    creditsRegistered: Number,
    creditsEarned: Number,
    sgpa: Number,
    file: { name: String, url: String },
  },
  sem5: {
    creditsRegistered: Number,
    creditsEarned: Number,
    sgpa: Number,
    file: { name: String, url: String },
  },
  sem6: {
    creditsRegistered: Number,
    creditsEarned: Number,
    sgpa: Number,
    file: { name: String, url: String },
  },
  sem7: {
    creditsRegistered: Number,
    creditsEarned: Number,
    sgpa: Number,
    file: { name: String, url: String },
  },
  sem8: {
    creditsRegistered: Number,
    creditsEarned: Number,
    sgpa: Number,
    file: { name: String, url: String },
  },
  supplementary1: {
    creditsRegistered: Number,
    creditsEarned: Number,
    sgpa: Number,
    file: { name: String, url: String },
  },
  supplementary2: {
    creditsRegistered: Number,
    creditsEarned: Number,
    sgpa: Number,
    file: { name: String, url: String },
  },
  supplementary3: {
    creditsRegistered: Number,
    creditsEarned: Number,
    sgpa: Number,
    file: { name: String, url: String },
  },
  supplementary4: {
    creditsRegistered: Number,
    creditsEarned: Number,
    sgpa: Number,
    file: { name: String, url: String },
  },
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
  activityPts: { community: Number, Credits: Number, Total: Number },
});
