"use strict";

module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define(
        "Todo",
        {
            name: DataTypes.STRING,
            endDate: DataTypes.STRING,
            status: DataTypes.INTEGER,
            content: DataTypes.STRING,
            createTime: DataTypes.STRING,
            updateTime: DataTypes.STRING,
        },
        {
            timestamps: false,
        }
    );
    Todo.associate = function (models) {
        // associations can be defined here
    };
    return Todo;
};
