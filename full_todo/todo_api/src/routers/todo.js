const Router = require("koa-router");
const models = require("../db/models");
const getDatetime = require("../utils/date");

const router = new Router({
    prefix: "/api/todo",
});

/**
 * @api {get} /todo/list 获取todo列表
 * @apiName 获取待办项列表
 * @apiGroup Todo
 *
 * @apiParam {Number} status 状态
 * @apiParam {Number} page 页码
 * @apiParam {Number} pageSize 每页条数
 */
router.get("/list", async (ctx, next) => {
    const { status, page, pageSize } = ctx.query;
    const whereContent = status ? { status } : null;
    const list = await models.Todo.findAll({
        where: whereContent,
        limit: pageSize || 10,
        offset: (page - 1) * 10 || 0,
    });
    ctx.body = {
        code: 20000,
        message: "获取待办项列表成功",
        data: {
            list,
        },
    };
});

/**
 * @api {get} /todo/detail/:id 待办项详情
 * @apiName 获取待办项详情
 * @apiGroup Todo
 *
 * @apiParam {Number} id 待办项ID
 */
router.get("/detail/:id", async (ctx, next) => {
    const { id } = ctx.params;
    const todo = await models.Todo.findOne({
        where: {
            id,
        },
    });
    ctx.body = {
        code: 20000,
        msg: "获取待办项成功",
        data: {
            todo,
        },
    };
});

/**
 * @api {delete} /todo/delete/:id 删除单个待办项
 * @apiName 根据ID删除某个待办项
 * @apiGroup Todo
 *
 * @apiParam {Number} id 待办项ID
 */
router.delete("/delete/:id", async (ctx, next) => {
    const { id } = ctx.params;
    const del = await models.Todo.update(
        {
            status: 3,
        },
        {
            where: {
                id,
            },
        }
    );
    ctx.body = {
        code: 20000,
        msg: "删除待办项成功",
        data: {
            del,
        },
    };
});

/**
 * @api {post} /todo/create 创建待办项
 * @apiName 创建一条待办项
 * @apiGroup Todo
 *
 * @apiParam {String} name 待办项名称
 * @apiParam {String} content 待办项内容
 * @apiParam {String} endDate 待办项到期时间
 */
router.post("/create", async (ctx, next) => {
    const { name, endDate, content } = ctx.request.body;
    const todo = await models.Todo.create({
        name,
        endDate,
        status: 1,
        content,
        createTime: getDatetime(),
    });
    ctx.body = {
        code: 20000,
        msg: "创建待办项成功",
        data: {
            todo,
        },
    };
});

/**
 * @api {patch} /todo/update/:id 更新单个待办项
 * @apiName 更新某个待办项
 * @apiGroup Todo
 *
 * @apiParam {Number} id 待办项ID
 * @apiParam {String} name 待办项名称
 * @apiParam {String} content 待办项内容
 * @apiParam {String} endDate 待办项到期时间
 * @apiParam {Number} status 待办项状态
 */
router.patch("/update/:id", async (ctx, next) => {
    const { id } = ctx.params;
    const { name, status, endDate, content } = ctx.request.body;
    const todo = await models.Todo.update(
        {
            name,
            endDate,
            status,
            content,
            updateTime: getDatetime(),
        },
        {
            where: {
                id,
            },
        }
    );
    ctx.body = {
        code: 20000,
        msg: "更新待办项成功",
        data: {
            todo,
        },
    };
});

module.exports = router;
