# Todo 全栈项目

### 目录结构

-   **todo_api**
    > Koa2 + MySQL + Sequelize 实现的 API 接口层
-   **todos**
    > React + Antd 实现的前端页面

### 项目使用

-   **下载项目**
    ```sh
    git clone git@gitee.com:DivinerSun/full_todo.git
    ```
-   **初始化 API 项目**

    ```sh
    cd todo_api

    # 安装依赖
    yarn

    # 生成接口文档
    yarn doc

    # 修改数据库连接配置 db/config/config.json:development

    # 迁移数据库
    yarn sequelize db:create
    yarn sequelize db:migrate

    # 启动项目
    yarn start

    # 使用 pm2 启动项目
    npm install -g pm2
    pm2 start ecosystem.config.js
    ```

-   **初始化前台项目**

    ```sh
    cd todos

    # 安装项目依赖
    yarn

    # 启动项目
    yarn start
    ```
