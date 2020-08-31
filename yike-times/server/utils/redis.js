const Redis = require("ioredis");
const config = require("../config");

const redis = new Redis(config.REDIS_PORT, config.REDIS_HOST);

const getValue = (key) => {
    return new Promise((resolve, reject) => {
        redis.get(key, (err, result) => {
            if (!err) {
                resolve({
                    code: "REDIS_GETVALUE_SUCCESS",
                    result,
                });
            } else {
                reject({
                    code: "REDIS_GETVALUE_FAILED",
                    result: err,
                });
            }
        });
    });
};

const setValue = (key, value, num = 3) => {
    return new Promise((resolve, reject) => {
        redis.setex(key, 60 * num, value, (err, result) => {
            if (!err) {
                resolve({
                    code: "REDIS_SETVALUE_SUCCESS",
                    result,
                });
            } else {
                reject({
                    code: "REDIS_SETVALUE_FAILED",
                    result: err,
                });
            }
        });
    });
};

module.exports = {
    setValue,
    getValue,
};
