const mongoose = require("mongoose");

const db = mongoose.createConnection("mongodb://localhost/yike", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("数据库连接成功！");
});

module.exports = db;
