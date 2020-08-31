const router = require("express").Router();
const { findUserList } = require("../services/userService");

router.get("/", async (req, res) => {
    // throw new Error();
    const list = await findUserList();
    res.send({
        code: 2000,
        msg: "SUCCESS",
        data: {
            list,
        },
    });
});

module.exports = router;
