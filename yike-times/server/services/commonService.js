const { User } = require("../models");
const { setValue, getValue } = require("../utils/redis");
const { sendEmail } = require("../utils/mail");

exports.sendMail = async (res, data) => {
    let cacheCode = "";
    const { code, result } = await getValue(data.email);
    if (code === "REDIS_GETVALUE_FAILED") {
        throw new Error(result);
    }
    if (code === "REDIS_GETVALUE_SUCCESS") {
        cacheCode = result;
    }
    const num = await User.find({
        email: data.email,
    }).countDocuments();
    if (num > 0) {
        res.json({
            code: -1,
            msg: "当前邮箱已注册",
        });
    } else if (cacheCode) {
        res.json({
            code: -1,
            msg: "操作过于频繁",
        });
    } else {
        const { code, result } = await sendEmail({
            emails: data.email,
            code: data.code,
        });
        if (code === "MAIL_SEND_FAILED") {
            throw new Error(result);
        } else {
            const { code: c, result: r } = await setValue(
                data.email,
                data.code
            );
            if (c === "REDIS_SETVALUE_FAILED") {
                throw new Error(r);
            }

            res.json({
                code: 2000,
                msg: "验证码发送成功",
            });
        }
    }
};
