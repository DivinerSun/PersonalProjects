const mongoose = require("mongoose");
const db = require("../config/db");

const Schema = mongoose.Schema;

const UserSchema = Schema();

const User = db.model("User", UserSchema);

// 数据库 users 表
module.exports = User;
