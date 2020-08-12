const router = require("express").Router();
const { findUserList } = require("../services/userService");

router.get("/", (req, res) => {
    // throw new Error();
    const list = findUserList();
    res.send({
        code: 2000,
        msg: "SUCCESS",
        data: list,
        // data: "Testting……",
    });
});

module.exports = router;
