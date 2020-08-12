const mongoose = require("mongoose");
const db = require("../config/db");

const Schema = mongoose.Schema;

const UserSchema = Schema();

const User = db.model("User", UserSchema);

module.exports = User;
