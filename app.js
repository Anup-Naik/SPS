const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const Admin = require("./models/adminModel");
const {
  showCreateFacultyForm,
  createFaculty,
  showEditFacultyForm,
  updateFaculty,
  deleteFaculty,
  adminDashboard,
  showCreateStudentForm,
  createStudent,
  updateStudentByAdmin,
  showEditStudentForm,
  deleteStudent,
} = require("./controllers/adminCont");
const {
  councelForm,
  saveCouncelForm,
  showStudent,
  renderEditStudent,
  updateStudent,
} = require("./controllers/studentCont");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const { myMulter } = require("./utils/multerUtil");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

main()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/SPS");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get("/", async (req, res) => {
  res.render("index");
});

//Admin Facuty Routes
app.get("/admin", catchAsync(adminDashboard));

app.get("/admin/faculty", catchAsync(showCreateFacultyForm));

app.post("/admin/faculty", catchAsync(createFaculty));

app.get("/admin/faculty/:id/edit", catchAsync(showEditFacultyForm));

app.put("/admin/faculty/:id", catchAsync(updateFaculty));

app.delete("/admin/faculty/:id", catchAsync(deleteFaculty));

//Admin Student Routes
app.get("/admin/student", catchAsync(showCreateStudentForm));

app.post("/admin/student", catchAsync(createStudent));

app.get("/admin/student/:id/edit", catchAsync(showEditStudentForm));

app.put("/admin/student/:id", catchAsync(updateStudentByAdmin));

app.delete("/admin/student/:id", catchAsync(deleteStudent));

// Student Module Routes
app.get("/student", catchAsync(councelForm));

app.post("/student", myMulter, catchAsync(saveCouncelForm));

app.get("/student/:id", catchAsync(showStudent));

app.get("/student/:id/edit", catchAsync(renderEditStudent));

app.put("/student/:id", myMulter, catchAsync(updateStudent));

// All Routes Except Above
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
