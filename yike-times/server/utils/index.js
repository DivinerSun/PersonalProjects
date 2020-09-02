const Bcryptjs = require("bcryptjs");

// 加密
const encryption = (val) => {
    const salt = Bcryptjs.genSaltSync(10);
    return Bcryptjs.hashSync(val, salt);
};

// 密码校验
const checks = (cur, old) => {
    return Bcryptjs.compareSync(cur, old);
};

// 生成指定位数的验证码
const genCode = (num = 6) => {
    let code = "";
    var codeChars = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,

        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",

        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ];
    for (let i = 0; i < num; i++) {
        const charNum = Math.floor(Math.random() * (codeChars.length - 1));
        code += codeChars[charNum];
    }

    return code;
};

module.exports = {
    encryption,
    checks,
    genCode,
};
