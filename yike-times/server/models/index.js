const mongoose = require("mongoose");
const db = require("../config/db");

const Schema = mongoose.Schema;

// 用户表
const UserSchema = Schema({
    email: {
        type: String,
        default: "",
    },
    pwd: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "",
    },
    nickName: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: "user.png",
    },
    gender: {
        type: Number,
        default: 1,
    },
    phone: {
        type: String,
        default: "",
    },
    signature: {
        type: String,
        default: "",
    },
    registerTime: {
        type: Date,
        default: Date.now(),
    },
    createTime: {
        type: Date,
        default: Date.now(),
    },
    updateTime: {
        type: Date,
        default: "",
    },
});

// 好友表
const FriendSchema = Schema({
    uId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    fId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: Number,
        default: 1,
    },
    time: {
        type: Date,
        default: Date.now(),
    },
});

// 消息表
const MessageSchema = Schema({
    uId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    fId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    type: {
        type: Number,
    },
    content: {
        type: String,
        default: "",
    },
    sendTime: {
        type: Date,
        default: Date.now(),
    },
    msgStatus: {
        type: Number,
        default: 1,
    },
});

// 群表
const GroupSchema = Schema({
    uId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        default: "",
    },
    img: {
        type: String,
        default: "group.png",
    },
    desc: {
        type: String,
        default: "",
    },
    announcement: {
        type: String,
        default: "",
    },
    time: {
        type: Date,
        default: Date.now(),
    },
    updateTime: {
        type: Date,
    },
});

// 群成员表
const GroupMemberSchema = Schema({
    gId: {
        type: Schema.Types.ObjectId,
        ref: "Group",
    },
    uId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    anotherName: {
        type: String,
        default: "",
    },
    joinTime: {
        type: Date,
        default: Date.now(),
    },
    unreadNum: {
        type: Number,
        default: 0,
    },
    isShield: {
        type: Number,
        default: 1,
    },
});

// 群消息表
const GroupMessageSchema = Schema({
    gId: {
        type: Schema.Types.ObjectId,
        ref: "Group",
    },
    uId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    type: {
        type: Number,
    },
    content: {
        type: String,
        default: "",
    },
    sendTime: {
        type: Date,
        default: Date.now(),
    },
});

const User = db.model("User", UserSchema);
const Friend = db.model("Friend", FriendSchema);
const Message = db.model("Message", MessageSchema);
const Group = db.model("Group", GroupSchema);
const GroupMember = db.model("GroupMember", GroupMemberSchema);
const GroupMessage = db.model("GroupMessage", GroupMessageSchema);

// 数据库 users 表
module.exports = {
    User,
    Friend,
    Message,
    Group,
    GroupMember,
    GroupMessage,
};
