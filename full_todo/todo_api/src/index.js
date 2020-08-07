const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const static = require("koa-static");
const cors = require("koa2-cors");
const path = require("path");
const TodoRouter = require("./routers/todo");

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(static(path.join(__dirname, "/public/apidoc")));
app.use(TodoRouter.routes());

app.listen(8000, () => {
    console.log("服务启动成功！");
});
