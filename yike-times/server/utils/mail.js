const nodemailer = require("nodemailer");
const Auth = require("./auth");

/**
 * 发送邮件方法
 * @param {Object} options 邮件发送参数
 *    @param {String|Array} emails: 接收者邮箱地址
 *    @param {String} subject: 邮件标题
 *    @param {String} code: 验证码
 *    @param {Number} minute: 有效时间(分钟)
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
        html: `<b>您的验证码为：
            <span style='color: #FFE431; font-size: 18px;'>${
                options.code
            }</span>
            <span>当前验证码有效期为 ${
                options.minute || 3
            } 分钟。请及时使用！</span>
        </b>`,
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
