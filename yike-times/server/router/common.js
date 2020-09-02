const router = require("express").Router();
const { genCode } = require("../utils");
const { sendMail } = require("../services/commonService");

router.post("/mail", (req, res) => {
    const { email } = req.body;
    const params = {
        email,
        code: genCode(),
    };
    sendMail(res, params);
});

module.exports = router;
