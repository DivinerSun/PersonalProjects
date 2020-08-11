const router = require("express").Router();

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

module.exports = router;
