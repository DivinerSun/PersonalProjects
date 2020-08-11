const router = require("express").Router();

router.get("/", (req, res) => {
    // throw new Error();
    res.send({
        code: 2000,
        msg: "SUCCESS",
        data: "Testting……",
    });
});

module.exports = router;
