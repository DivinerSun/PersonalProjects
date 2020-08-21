const User = require("../models/user");

exports.findUserList = (params) => {
    return User.find((err, res) => {
        if (err) {
            throw new Error(err);
        }
        return res;
    });
};
