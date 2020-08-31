const nodemailer = require("nodemailer");
const Auth = require("./auth");

/**
 * 发送邮件方法
 * @param {Object} options 邮件发送参数
 *    @param emails: 接收者邮箱地址
 *    @param subject: 邮件标题
 *    @param code: 验证码
 */
const sendEmail = (options) => {
    const mailTransport = {
        host: "smtp.sina.com",
        port: 465,
        secure: true,
        auth: {
            // 邮箱地址
            user: "",
            // 邮箱授权码
            pass: "",
        },
    };

    const transporter = nodemailer.createTransport({
        ...mailTransport,
        ...Auth.mailTransport,
    });
    const sendInfos = {
        from: '"逸刻时光 👻" <sqq_job@sina.com>',
        to: options.emails,
        subject: `✔ ${options.subject || "逸刻时光验证码"} ✔`,
        html: `<b>您的验证码为：<span style='color: #FFE431; font-size: 18px;'>${options.code}</span></b>`,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(sendInfos, (err, msg) => {
            if (!err) {
                resolve({
                    code: "MAIL_SEND_SUCCESS",
                    result: msg,
                });
            } else {
                reject({
                    code: "MAIL_SEND_FAILED",
                    result: err,
                });
            }
        });
    });
};

module.exports = {
    sendEmail,
};
