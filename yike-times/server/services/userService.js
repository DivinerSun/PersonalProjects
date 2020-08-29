const { User } = require("../models");

exports.findUserList = (params) => {
    return User.find((err, res) => {
        if (err) {
            throw new Error(err);
        }
        return res;
    });
};
