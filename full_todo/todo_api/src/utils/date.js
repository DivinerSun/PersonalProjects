const dayjs = require("dayjs");

module.exports = (format = "YYYY/MM/DD HH:mm:ss") => {
    return dayjs().format(format);
};
