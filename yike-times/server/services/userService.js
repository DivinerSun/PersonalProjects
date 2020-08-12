const db = require("../config/db");
const User = require("../models/user");

exports.findUserList = (params) => {
    User.find((err, res) => {
        if (err) {
            throw new Error(err);
        }
        return res;
    });
};
