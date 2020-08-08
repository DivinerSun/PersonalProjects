# NodeJS + Uniapp 前后端分离的即时通讯项目

## 项目技术栈

### 后端技术栈

-   语言：NodeJS
-   框架：Express + WebSocket
-   数据库：MongoDB

### 前端技术栈

-   语言：JavaScript
-   框架：VueJS + Uniapp

## 项目表结构

### 用户表: Users

| 字段名称     | 字段描述      |
| ------------ | ------------- |
| id           | 用户表主键 id |
| email        | 邮箱地址      |
| phone        | 手机号        |
| username     | 用户名        |
| password     | 用户密码      |
| nickname     | 用户昵称      |
| gender       | 用户性别      |
| avatar       | 用户头像地址  |
| signature    | 用户签名      |
| registerTime | 注册时间      |
| createTime   | 创建时间      |
| updateTime   | 更新时间      |

### 好友表: Friends

| 字段名称 | 字段描述      |
| -------- | ------------- |
| id       | 好友表主键 id |
|          |               |
