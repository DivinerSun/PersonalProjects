const router = require("express").Router();
const { saveOneUser, findOneUser } = require("../services/userService");

router.get("/", (req, res) => {
  res.send({
    code: 2000,
    msg: "SUCCESS",
    data: {
      name: "Diviner",
      age: 18,
      gender: "男",
    },
  });
});

// 用户注册
router.post("/signup", (req, res) => {
  const { email, pwd, nickName, code } = req.body;
  const params = {
    email,
    pwd,
    nickName,
    name: `yike-${nickName}`,
    code,
  };
  saveOneUser(res, params);
});

// 用户登录
router.post("/signin", (req, res) => {
  const { email, pwd } = req.body;
  const params = {
    email,
    pwd,
  };
  findOneUser(res, params);
});

module.exports = router;
