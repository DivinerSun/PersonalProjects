"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Todos", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            endDate: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.INTEGER,
                // 待办项状态：1 --- 待完成； 2 --- 已完成； 3 --- 已删除
                defaultValue: 1,
            },
            content: {
                type: Sequelize.STRING,
            },
            createTime: {
                type: Sequelize.STRING,
            },
            updateTime: {
                type: Sequelize.STRING,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Todos");
    },
};
