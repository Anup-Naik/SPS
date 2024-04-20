const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  name: String,
  role: { type: String, enum: ["admin"], default: "admin" },
});

module.exports = mongoose.model("Admin", adminSchema);