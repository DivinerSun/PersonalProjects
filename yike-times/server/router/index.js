const routers = require("express").Router();

// routers
const testRouter = require("./test");
const userRouter = require("./user");

routers.use("/test", testRouter);
routers.use("/user", userRouter);

routers.use("*", (req, res, next) => {
    const error = new Error("Not Found");
    res.send({
        code: 4004,
        msg: error.message,
    });
    next();
});

routers.use("*", (err, req, res, next) => {
    if (err) {
        console.log(err);
        res.send({
            code: 5000,
            msg: "服务器内部错误！",
            data: err.message,
        });
    }
    next();
});

module.exports = routers;
