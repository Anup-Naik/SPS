const express = require("express");
const router = express.Router();
const {
    loggingUserIn,
    loggingUserOut,
    renderLoginForm,
  } = require("../controllers/sessionCont");
  const catchAsync = require("../utils/catchAsync");
  const { isLoggedIn, } = require("../utils/authCheck");

  //Login Routes
router.get("/login", renderLoginForm);

router.post("/login", catchAsync(loggingUserIn));

router.get("/logout", isLoggedIn, loggingUserOut);


module.exports = router;