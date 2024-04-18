const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const Student = require("./models/studentModel");
const multer = require("multer");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

main()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/SPS");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/student", (req, res) => {
  res.render("counsellingForm");
});

app.post("/student", upload.array([]), async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(req.body);
});

app.get("/student/:id", async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById({ _id: id });
  res.render("show", { student });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
