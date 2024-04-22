const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/adminModel");
const Faculty = require("../models/facultyModel");
const Student = require("../models/studentModel");

module.exports = (passport) => {
  // Local strategy for Admin
  passport.use(
    "admin",
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await Admin.findOne({ username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Local strategy for Faculty
  passport.use(
    "faculty",
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await Faculty.findOne({ username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Local strategy for Student
  passport.use(
    "student",
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await Student.findOne({ username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, { id: user.id, role: user.role });
  });

  passport.deserializeUser(async ({ id, role }, done) => {
    try {
      if (role === "admin") {
        const user = await Admin.findById(id);

        done(null, user);
      } else if (role === "faculty") {
        const user = await Faculty.findById(id);
        done(null, user);
      } else if (role === "student") {
        const user = await Student.findById(id);
        done(null, user);
      }
    } catch (err) {
      done(err);
    }
  });
};
