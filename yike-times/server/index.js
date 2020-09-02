const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PROTOCOL, HOST, PORT } = require("./config");
const routers = require("./router");

const app = express();

// 跨域处理
app.use(cors());

// 请求 body 参数获取
app.use(bodyParser.json());

// 路由加载
app.use("/api", routers);

app.get("/", (req, res) => {
    res.json({
        msg: "SUCCESS",
        data: "逸刻时光",
    });
});

app.listen(PORT, () => {
    console.log(`The Server Running At: ${PROTOCOL}://${HOST}:${PORT}`);
});
