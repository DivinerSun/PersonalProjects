const { User } = require("../models");
const { getValue } = require("../utils/redis");
const { checks } = require("../utils");

exports.findUserList = (data) => {
    return User.find((err, res) => {
        if (err) {
            throw new Error(err);
        }
        return res;
    });
};

// 用户注册
exports.saveOneUser = async (res, data) => {
    // 校验邮箱和用户昵称
    let cacheCode = "";
    const { code, result } = await getValue(data.email);
    if (code === "REDIS_GETVALUE_FAILED") {
        throw new Error(result);
    }
    if (code === "REDIS_GETVALUE_SUCCESS") {
        cacheCode = result;
    }
    const num = await User.find({
        $or: [{ email: data.email }, { nickName: data.nickName }],
    }).countDocuments();
    if (num > 0) {
        res.json({
            code: -1,
            msg: "当前邮箱或名字已使用",
        });
    } else if (cacheCode !== data.code) {
        res.json({
            code: -1,
            msg: "验证码错误，请重新获取",
        });
    } else {
        User.create(data, (err) => {
            if (err) {
                throw new Error(err);
            }
            res.json({
                code: 2000,
                msg: "用户注册成功",
            });
        });
    }
};

// 用户登录
exports.findOneUser = async (res, data) => {
    const user = await User.findOne({ email: data.email });
    if (!user) {
        res.json({
            code: -1,
            msg: "当前邮箱不存在",
        });
    }
    if (checks(data.pwd, user.pwd)) {
        res.json({
            code: 2000,
            msg: "用户登录成功",
            data: {
                user: {
                    _id: user._id,
                    email: user.email,
                },
            },
        });
    } else {
        res.json({
            code: -1,
            msg: "用户密码错误",
        });
    }
};
