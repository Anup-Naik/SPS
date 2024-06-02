const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  name: String,
  role: { type: String, enum: ["admin"], default: "admin" },
  allowStudAccess: { type: Boolean, default: false },
  allowStudEditAccess: { type: Boolean, default: false },
});

module.exports = mongoose.model("Admin", adminSchema);
